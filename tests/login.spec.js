import { test, expect } from '@playwright/test';

test('login using valid credentials ',async({page})=>{
    await page.goto('https://www.facebook.com/login/?privacy_mutation_token=eyJ0eXBlIjowLCJjcmVhdGlvbl90aW1lIjoxNjkzOTcxNzk4LCJjYWxsc2l0ZV9pZCI6MzgxMjI5MDc5NTc1OTQ2fQ%3D%3D')
    
})
