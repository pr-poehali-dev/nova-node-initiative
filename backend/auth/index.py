import json
import os
import hashlib
import secrets
import psycopg

def get_conn():
    return psycopg.connect(os.environ['DATABASE_URL'])

def hash_password(password: str) -> str:
    return hashlib.sha256(f"glas_nebesniy_salt{password}".encode()).hexdigest()

def make_token(user_id: int) -> str:
    return hashlib.sha256(f"{user_id}{secrets.token_hex(16)}".encode()).hexdigest()

def handler(event: dict, context) -> dict:
    """Регистрация и вход пользователей школы"""
    cors = {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'POST, OPTIONS'}

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    action = body.get('action')
    conn = get_conn()
    cur = conn.cursor()

    def esc(s):
        return s.replace("'", "''")

    if action == 'register':
        email = body.get('email', '').strip().lower()
        password = body.get('password', '')
        name = body.get('name', '').strip()

        if not email or not password or not name:
            return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Заполните все поля'})}

        cur.execute(f"SELECT id FROM users WHERE email = '{esc(email)}'")
        if cur.fetchone():
            return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Email уже зарегистрирован'})}

        pw_hash = hash_password(password)
        cur.execute(f"INSERT INTO users (email, password_hash, name) VALUES ('{esc(email)}', '{pw_hash}', '{esc(name)}') RETURNING id")
        user_id = cur.fetchone()[0]
        conn.commit()
        token = make_token(user_id)
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'token': f"{user_id}:{token}", 'name': name})}

    if action == 'login':
        email = body.get('email', '').strip().lower()
        password = body.get('password', '')
        pw_hash = hash_password(password)

        cur.execute(f"SELECT id, name FROM users WHERE email = '{esc(email)}' AND password_hash = '{pw_hash}'")
        row = cur.fetchone()
        if not row:
            return {'statusCode': 401, 'headers': cors, 'body': json.dumps({'error': 'Неверный email или пароль'})}

        user_id, name = row
        token = make_token(user_id)
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'token': f"{user_id}:{token}", 'name': name})}

    return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Неизвестное действие'})}