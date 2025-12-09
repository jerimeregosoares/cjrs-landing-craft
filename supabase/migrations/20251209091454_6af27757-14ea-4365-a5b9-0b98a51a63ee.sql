-- Adicionar role de admin para jerimeregosoares@gmail.com
INSERT INTO user_roles (user_id, role)
VALUES ('4ade8ef3-c02b-41b3-b964-deafece81927', 'admin'::app_role)
ON CONFLICT (user_id, role) DO NOTHING;