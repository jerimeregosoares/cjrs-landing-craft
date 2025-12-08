-- Adicionar role de admin para o usuário existente
INSERT INTO user_roles (user_id, role)
VALUES ('8e2d915d-8953-4877-a537-5584b3963c0a', 'admin'::app_role)
ON CONFLICT (user_id, role) DO NOTHING;