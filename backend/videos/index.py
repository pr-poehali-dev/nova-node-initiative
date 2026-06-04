import json
import os
import psycopg

def get_conn():
    return psycopg.connect(os.environ['DATABASE_URL'])

def handler(event: dict, context) -> dict:
    """Получение списка видеоуроков для авторизованных учеников"""
    cors = {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type, X-Authorization', 'Access-Control-Allow-Methods': 'GET, OPTIONS'}

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    auth = event.get('headers', {}).get('X-Authorization', '')
    if not auth or ':' not in auth:
        return {'statusCode': 401, 'headers': cors, 'body': json.dumps({'error': 'Требуется авторизация'})}

    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT id, title, description, youtube_id, sort_order FROM videos ORDER BY sort_order")
    rows = cur.fetchall()

    videos = [
        {'id': r[0], 'title': r[1], 'description': r[2], 'youtube_id': r[3], 'sort_order': r[4]}
        for r in rows
    ]

    return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'videos': videos})}