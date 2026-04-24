#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt

mkdir -p apps/predictions/ml/model_artifacts

if [ -n "$MODEL_URL" ]; then
  echo "Downloading model pipeline..."
  python - <<'PY'
import os
import urllib.request

url = os.environ.get("MODEL_URL")
output_path = "apps/predictions/ml/model_artifacts/churn_pipeline.pkl"

urllib.request.urlretrieve(url, output_path)

print("Downloaded model to:", output_path)
print("Size:", os.path.getsize(output_path))
PY
else
  echo "MODEL_URL not set. Skipping model download."
fi

python manage.py collectstatic --no-input
python manage.py migrate

python manage.py shell -c "
from django.contrib.auth import get_user_model;
User = get_user_model();
username = 'admin';
email = 'admin@example.com';
password = 'admin123';
if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username, email, password);
    print('Superuser created');
else:
    print('Superuser already exists');
"