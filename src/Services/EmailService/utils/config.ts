export class Config{
    static username
    static password
    static Mailbox_SourcePath
    public static IMAPConfig(){
        return {
            user:Config.username,
            password:Config.password,
            host:"imap.outlook.com",
            port:993,
            tls:true,
            tlsOptions:{rejectUnauthorized:false},
            keepAlive:{interval:60000}
        }
    }
}