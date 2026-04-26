# Supabase backend helper

Steps to run the small Flask auth verifier locally.

1. Copy `.env.example` to `.env` and fill in the values from your Supabase project.

2. Create a Python virtualenv and install the minimal requirements (avoids conflicts with the large project `requirements.txt`):

```powershell
cd Backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install -r requirements-min.txt
```

3. Run the Flask verifier:

```powershell
# from Backend folder
python -m src.auth
```

4. Test the endpoint (replace <TOKEN> with a user access token):

```powershell
curl -H "Authorization: Bearer <TOKEN>" http://localhost:8080/api/verify
```

Security notes:
- Keep `SUPABASE_SERVICE_ROLE_KEY` server-side only. Never commit it.
- For production, run the Flask app behind a proper WSGI server and set secure environment variables.