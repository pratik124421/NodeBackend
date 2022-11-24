import { Config } from "./utils/config";

const Imap = require('imap')

export class ImapService{
    private static instance : ImapService;
    private imap : any = null;
    public static getInstance(){
        if(ImapService.instance == null){
            ImapService.instance = new ImapService()
        }
        return ImapService.instance
    }

    public async runJob(){
        const imap = this.getImap()

        if(!imap){
            this.initImap()
            this.connectImap()
        }else{

        }

    }

    private initImap(){
        const imap = new Imap(Config.IMAPConfig())
        this.setImap(imap)
    }

    private setImap(imap:any){
        this.imap = imap
    }

    private getImap(){
        return this.imap
    }

    private connectImap(){
        try{
            const imap = this.getImap()

            imap.once("ready",()=>{
                imap.openBox(Config.Mailbox_SourcePath,false,(err:any,box:any) => {
                    if(err){
                        console.log("error in imap",err)
                    }
                    imap.search(["UNSEEN"],(err:any,results:Array<any>) => {
                        if(err){
                            console.log("imap search error")
                        }
                        if(!results.length){
                            console.log("nothing to fetch")
                        }
                        else{
                            var iobj = imap.fetch(results,{bodies:""});

                            iobj.on("message",(msg:any,seqno:any) => {
                                console.log("sequence no: ",seqno)

                                var prefix = "(#"+seqno+")";
                                var buffer : any;
                                var attributes : any;

                                msg.on("body",(stream:any,info:any)=>{
                                    var buff = ""
                                    stream.on("data",(chunk:any)=>{
                                        buff += chunk.toString("utf8");
                                    });
                                    stream.once("end",()=>{
                                        buffer = buff
                                    });
                                });

                                msg.once("attributes",(attr:any)=>{
                                    attributes = attr;
                                    console.log("attributes...",attributes)
                                });

                                msg.once("end",async()=>{
                                    console.log("finished...")
                                });
                            });

                            iobj.once("error",(err:any)=>{
                                console.log("fetch error...")
                            });

                            iobj.once("end",()=>{
                                console.log("done fetching all messages...")
                            });
                        }
                    });
                });
            });

            imap.once("error",(err:any)=>{
                console.log("error in imap...")
                imap.end();
            })

            imap.once("end",()=>{
                console.log("connection end...")
            })

            imap.connect();
        }
        catch(error){
            console.log("error...",error)
        }
    }


}