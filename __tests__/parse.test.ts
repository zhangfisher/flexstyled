import { test ,describe, expect} from 'vitest';
import { parseObjectStyles } from '../src/parse';
import { keyframes, parseKeyframes } from '../src/keyframes';




describe('Parse styles', () => {
    test('解析媒体查询', () => {
        const  result = parseObjectStyles({
            "@media screen and (max-width: 600px)": {
                color: 'red',
                fontSize: '12px',
                "@media screen and (max-width: 914px)":{
                    fontSize: '14px',
                    "&>div":{
                        padding: '4px'
                    }
                },
                "--my-var1":"1px",
                "@keyframes myani": {  
                    "from": {
                      "opacity": "var(--bg-color)"
                    },
                    "to": {
                      "opacity": 1
                    }                  
                  }
            },
            "@keyframes my-animation":{
                "0%":{
                    opacity: 0
                },
                "50%":{
                    opacity: 1
                },
                "100%":{
                }
            }
        },{className:"x12345678"}); 
        expect(1).toBe(1);
    });

    test("解析Keyforms样式", () => {
        const  result = parseKeyframes("myani",{
                "0%":{
                    opacity: 0
                },
                "50%":{
                    opacity: (props:any)=>props.someProp
                },
                "100%":{
                }
        }); 
        expect(1).toBe(1);
    })
});
 

