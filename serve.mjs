import http from 'node:http';
import {createReadStream,statSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('./dist/',import.meta.url));
export function createPreviewServer(){
 return http.createServer((req,res)=>{
  try{
   const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
   const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
   if(!file.startsWith(root)){res.writeHead(403).end();return}
   const stat=statSync(file);
   if(!stat.isFile()){res.writeHead(404).end();return}
   const type={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mp4':'video/mp4'}[path.extname(file)]||'application/octet-stream';
   const headers={'Content-Type':type,'Accept-Ranges':'bytes','Cache-Control':'no-store'};
   const match=req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
   if(match){const start=Number(match[1]);const end=Math.min(match[2]?Number(match[2]):stat.size-1,stat.size-1);if(start>end){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`}).end();return}res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${stat.size}`,'Content-Length':end-start+1});createReadStream(file,{start,end}).pipe(res)}
   else{res.writeHead(200,{...headers,'Content-Length':stat.size});if(req.method==='HEAD')res.end();else createReadStream(file).pipe(res)}
  }catch{res.writeHead(404).end('Not found')}
 });
}
if(process.argv[1]===fileURLToPath(import.meta.url)){const server=createPreviewServer();server.listen(4174,'127.0.0.1',()=>console.log('Emi OS: http://127.0.0.1:4174'))}
