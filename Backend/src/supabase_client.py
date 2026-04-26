import os
from supabase import create_client
from dotenv import load_dotenv

# load .env file if present (helps local development)
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")

if not SUPABASE_URL:
    raise RuntimeError("SUPABASE_URL environment variable not set")

# prefer service role key for server-side operations
_key = SUPABASE_SERVICE_ROLE_KEY if SUPABASE_SERVICE_ROLE_KEY else SUPABASE_ANON_KEY
if not _key:
    raise RuntimeError("Either SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY must be set")

supabase = create_client(SUPABASE_URL, _key)

__all__ = ["supabase", "SUPABASE_URL"]
