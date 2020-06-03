# Dovetta Nicolas - 4^B Informatica
## I.I.S. "G. Vallauri" - Fossano

In questo semplice sito è possibile andare a creare un menù settimanale visualizzato distintamente tra cena e pranzo. Se non si mettono piatti viene inserito automaticamente il carattere '-'. Per accedere bisogna registrarsi e poi effettuare il login. La grafica è gestita tramite bootstrap e nella prima pagina troviamo il pulsante di modifica password e logout(che ci seguirà ovunque).

## Prima di cominciare
Importare il progetto nella cartella di xampp e avviarlo da li. Successivamente importare il database "progetto.sql" in phpMyAdmin e infine avviare l'applicazione. Il file del database __*CONTIENE*__ l'istruzione "CREATE DATABASE IF NOT EXIST".

### Registrazione
Tutti i campi sono obligatori e ci si può iscrivere una sola volta. Il controllo è effettuato sulla mail.

### Primo avvio
L'applicazione si apre sulla pagina di login dove noi, andando a registrarsi, potremo accedere alla pagina di index che inizialmente mostrerà 2 messaggi che ci avvertono che non è possibile visualizzare record in quanto non ci abbaimo mai aggiunto un menù.
Possiamo andare nella barra di navigazione in alto e riaggiornare la pagina tramite il pulsante menù settimanale o andare a aggiungere un menù premendo sul link di aggiungi.

#### Avvii successivi
Verrà sempre richiamata la pagina index che controllerà la validità della sessione (30 minuti c.a.) e, in caso di invalidità tornerà alla pagina di login. Una volta che la sessione sarà valida vedremo il menù come lo abbiamo lasciato quando abbiamo interrotto il lavoro.

### Pagina di aggiunta
Sulla pagina di aggiunta dobbiamo inserire i vari piatti per antipasto, primo, secondo e dolce per ogni giorno della settimana, pranzo e cena.

### Pagina di modifica
Nella prima select si seleziona il tipo dei piatti che si vuole modificare, ad esempio cena. Compariranno i giorni in cui abbiamo aggiunto il menù per la cena. Se un campo viene rimosso esso assume il valore predefinito del '-'.
A seconda dell'operazione che vogliamo fare c'è il pulsante di modifica o elimina campo che fanno riferimento a un file php che si occupa di eseguire le operazioni sul database.

### Modifica della password
Il pulsante compare solo nella pagina principale e, una volta arrivati nella pagina dovremo inserire la vecchia password e 2 volte quella nuova. Una volta che verrà verificata la nuova password essà verrà modificata e saremo reinderizzati alla pagina di login.

### Pulsante di logout
Distrugge la sessione corrente.

### Recupero della password
Inseriamo la mail nel campo dedicato nella pagina di logout e, premendo sul pulsante recupera password la password viene automaticamente reimpostata con il default "password".

### Utenti esterni non registrati
Tramite la mail "tester@authorised.this" e la password "password" ci può entrare e provare le funzionalità del sito.

## Nota importante
Un invio della mail è stato provato per la reimpostazione della password ma, non funzionando si è ripiegato sull'utilizzo di un alert. Le navbar sono solite funzionare ma, senza criterio, a volte si ridimensionano a piacimento loro.

In caso di problemi ecco i miei contatti:
Telefono: 3491116472
E-Mail: n.dovetta.0823@vallauri.edu