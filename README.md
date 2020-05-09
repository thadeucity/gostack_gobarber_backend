# Recuperação de senha
**RF**
- O usuário deve poder recuoperar sua senha informando seu e-mail;
- O usuário deve receber um email com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**
- Utilizar Mailtrap para testar envios em ambiente de desenvolviment;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mail deve acontecer em segundo plano (background job);

**RN**
- O link enciado por email para resetar senha deve expirar em 2h;
- O usuário precisa digitar e confirmar a nova senha;



# Atualização do perfil
**RF**
- O usuário deve poder atualizar seu perfil (nome, email, senha);

**RN**
- O usuário não pode alterar seu email para um email já utilizado por outro usuário;
- Para atualizar sua senha o usuário deve informar a senha antiga;
- O usuário deve confirmar a senha no caso de alteração para nova senha;


# Painel do prestador
**RF**
- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**
- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket-io;

**RN**
- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviços
**RF**
- O usuário deve poder listar todos os prestadores de serviço listados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador específico;
- O usuário deve poder listar horários disponíveis em um dia específico de um presteador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**
- Listagem de prestadores deve ser armazenada em cache;

**RN**
- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h e 18h (Primeiro às 8 e últomo às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário passado;
- O usuário não pode agendar serviços consigo mesmo;

------------


# Next Steps

1
