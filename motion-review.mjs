import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import {captureMotion} from 'file:///C:/Users/nilson.lopes/.agents/skills/df-design/scripts/lib/motion-capture.mjs';
import {createPreviewServer} from './serve.mjs';
const require=createRequire('C:/Users/nilson.lopes/.agents/skills/df-design/package.json');
const {chromium}=require('playwright');
const browser=await chromium.launch({channel:'msedge',headless:true});
const server=createPreviewServer();
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const source=readFileSync('dist/app.js','utf8');
const user=source.match(/value\.trim\(\) === '([^']+)'/)[1];
const password=source.match(/\$\('password'\)\.value === '([^']+)'/)[1];
const wrapper={newContext:async options=>{
 const ctx=await browser.newContext(options);
 const originalNewPage=ctx.newPage.bind(ctx);
 ctx.newPage=async()=>{
  const page=await originalNewPage();
  const originalGoto=page.goto.bind(page);
  page.goto=async(...args)=>{
   const response=await originalGoto(...args);
   if(!String(args[0]).startsWith('http://127.0.0.1:')) return response;
   await page.locator('#username').fill(user);
   await page.locator('#username').press('Enter');
   await page.locator('#password').fill(password);
   await page.locator('#password').press('Enter');
   await page.locator('#video-section').waitFor({state:'visible'});
   await page.locator('#skip-video').click();
   await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
   await page.waitForTimeout(1000);
   return response;
  };
  return page;
 };
 return ctx;
}};
try{
 const capture=await captureMotion(wrapper,`http://127.0.0.1:${server.address().port}`,{out:'captures/motion',size:{width:1440,height:900},clicks:[],maxSteps:90,stepPx:160,interval:90,pause:500});
 console.log(JSON.stringify({steps:capture.steps,reachedEnd:capture.reachedEnd,sheets:capture.sheets,video:capture.video,errors:capture.errors}));
}finally{await browser.close();server.close()}
