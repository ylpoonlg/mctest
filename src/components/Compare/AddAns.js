import { Button, Input } from '@material-ui/core'
import React from 'react'

function AddAns(props) {

    function onUpdate(name, ans) {
        props.onUpdate(name, stripAns(ans));
    }

    function formatAns(ans) {
        let res = "";
        for (var i = 0; i < ans.length; i++) {
            res += ans[i];
            if ((i+1) % 10 == 0) {
                res += "\n";
            } else if ((i+1) % 5 == 0) {
                //res += " ";
            }
        }
        if (res[res.length-1] == '\n') {
            res = res.substr(0, res.length-1);
        }
        return res;
    }

    function stripAns(ans) {
        let res = "";
        for (var i = 0; i < ans.length; i++) {
            if (ans[i] != "\n") {
                res += ans[i];
            }
        }
        return res;
    }

    return (
        <div style={{padding: "1rem", display: "flex", justifyContent: "center", alignItems: "center",
            border: "solid #ccc 1px", borderRadius: "2rem", maxWidth: "550px", margin: "1rem auto"
        }}>

            <div>
                <Input placeholder="Name" style={{marginRight: "1.5rem", marginBottom: "1rem", display: "block"}}
                    onChange={(e) => {onUpdate(e.target.value, props.ans);}}
                    value={props.name}
                />
                <button style={{background: "#ff0000", color: "#fff",
                    padding: "0.5rem 1rem", border: "none", boxShadow: "none",
                    borderRadius: "0.5rem"
                    }}
                    onClick={(e) => {
                        props.onRemove()
                    }}
                >Remove</button>
            </div>

            <textarea placeholder="Answer" value={formatAns(stripAns(props.ans))}
                rows={5} cols={20}
                onChange={(e) => {onUpdate(props.name, e.target.value);}}
                style={{textAlign: "center", padding: "0.5rem"}}
            />
        </div>
    )
}

export default AddAns
