# Fluxo Completo de Commit e Push (Com Multi-Contas)

Este guia contém a sequência exata de comandos para salvar seu trabalho no GitHub, incluindo a solução para erros de permissão.

## 1. Verificando Alterações
Comece sempre olhando o que mudou no projeto:
```powershell
git status
```

## 2. Preparando os Arquivos
Adicione todos os arquivos modificados para o "palco" de commit:
```powershell
git add .
```

## 3. Criando o Commit
Grave as alterações com uma descrição do que foi feito:
```powershell
git commit -m "Sua descrição aqui"
```

## 4. Enviando para o GitHub (O "Pulo do Gato")
Tente o envio normal primeiro:
```powershell
git push origin main
```

---

## 🆘 Se o erro "403 Permission Denied" aparecer:
Se o erro disser que a permissão foi negada para outro usuário (ex: `jerime10`), execute este comando para configurar o usuário correto **neste projeto**:

```powershell
git remote set-url origin https://jerimeregosoares@github.com/jerimeregosoares/cjrs-landing-craft.git
```

**Após configurar o URL acima, tente o push novamente:**
```powershell
git push origin main
```

### O que esperar:
- Uma janela abrirá pedindo para logar via navegador (**sign in with browser**).
- Autorize o acesso ATRAVÉS DO TOKEN DE ACESSO DO GITHUB garantindo que está logado no site do GitHub com a conta `jerimeregosoares`.

---

## Resumo da Sequência Rápida:
1. `git status`
2. `git add .`
3. `git commit -m "mensagem"`
4. `git push origin main` (Se falhar, use o `set-url` acima e tente de novo).
