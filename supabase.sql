-- Create Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255),
  reward_points INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Items table
CREATE TABLE items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('lost', 'found')),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  location TEXT,
  date DATE,
  image_data_uri TEXT,
  is_recovered BOOLEAN DEFAULT FALSE,
  locker_number INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Function to create a profile for a new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (new.id, new.raw_user_meta_data->>'name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create a profile when a new user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Enable Row Level Security for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Enable Row Level Security for items
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all items" ON items FOR SELECT USING (true);
CREATE POLICY "Users can insert their own items" ON items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own items" ON items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own items" ON items FOR DELETE USING (auth.uid() = user_id);

-- Enable Realtime on tables
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime;
COMMIT;
ALTER PUBLICATION supabase_realtime ADD TABLE items;
ALTER PUBLICATION supabase_realtime ADD TABLE profiles;
