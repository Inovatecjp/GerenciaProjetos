import sqlite3
import psycopg2
from psycopg2 import sql

# Caminho do banco SQLite
primeiro_banco = 'C://Users//Inovatec-20//Documents//GitHub//GerenciaProjetos//sequelize.sqlite'


# Nome da tabela a ser copiada
nome_da_tabela = "profile_grant"  # Substitua pelo nome da tabela

# Conectar ao banco SQLite e obter os dados
conn1 = sqlite3.connect(primeiro_banco)
cursor1 = conn1.cursor()
cursor1.execute(f"SELECT * FROM {nome_da_tabela}")
dados = cursor1.fetchall()
colunas = [desc[0] for desc in cursor1.description]
conn1.close()

# Conectar ao banco PostgreSQL
conn2 = psycopg2.connect(**pg_config)
cursor2 = conn2.cursor()

# Criar a tabela no banco PostgreSQL, se ela não existir
create_table_query = f"CREATE TABLE IF NOT EXISTS {nome_da_tabela} ({', '.join([f'{col} TEXT' for col in colunas])})"
cursor2.execute(create_table_query)

# Inserir os dados no banco PostgreSQL
insert_query = sql.SQL(f"INSERT INTO {nome_da_tabela} ({', '.join(colunas)}) VALUES ({', '.join(['%s' for _ in colunas])})")
print(insert_query)
print(dados)
# for i in dados:
#     i = list(i)  # Converte a tupla para lista
#     # Altere a coluna específica para 'true' ou 'false' dependendo de alguma condição
#     i[3] = 'true' if i[3] != 0 else 'false'
#     print(i[3])  # Verifique a alteração

#     # Agora, i é uma lista e pode ser usada para a inserção no PostgreSQL
#     cursor2.execute(insert_query, tuple(i))
cursor2.executemany(insert_query, dados)

# Confirmar as mudanças e fechar a conexão
conn2.commit()
cursor2.close()
conn2.close()

print("Cópia concluída com sucesso.")