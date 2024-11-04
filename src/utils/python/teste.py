import sqlite3

# Caminho dos bancos de dados
primeiro_banco = '/home/tigaz/Documents/inovate/gerencia/GerenciaProjetos/sequelize2.sqlite'
segundo_banco = '/home/tigaz/Documents/inovate/gerencia/GerenciaProjetos/sequelize.sqlite'
# nome_da_tabela = "Metas"  # substitua pelo nome da tabela que quer copiar
# nome_da_tabela = "profiles"  # substitua pelo nome da tabela que quer copiar
# nome_da_tabela = "profile_grant"  # substitua pelo nome da tabela que quer copiar
# nome_da_tabela = "grants"  # substitua pelo nome da tabela que quer copiar
nome_da_tabela = "Tarefas"  # substitua pelo nome da tabela que quer copiar

# Conectar ao banco de origem e obter todos os dados da tabela
conn1 = sqlite3.connect(primeiro_banco)
cursor1 = conn1.cursor()
cursor1.execute(f"SELECT * FROM {nome_da_tabela}")
dados = cursor1.fetchall()
colunas = [desc[0] for desc in cursor1.description]
conn1.close()

# Conectar ao banco de destino
conn2 = sqlite3.connect(segundo_banco)
cursor2 = conn2.cursor()

# Criar a tabela no banco de destino se ela ainda não existir
cursor2.execute(f"CREATE TABLE IF NOT EXISTS {nome_da_tabela} ({', '.join(colunas)})")

# Inserir todas as linhas copiadas no banco de destino
cursor2.executemany(f"INSERT INTO {nome_da_tabela} VALUES ({', '.join(['?' for _ in colunas])})", dados)
conn2.commit()
conn2.close()

print("Cópia concluída com sucesso.")