import React, { useState } from "react";
import { FormControl, InputLabel, Input, Button, FormHelperText } from "@material-ui/core";
import { useHistory } from "react-router";
import { PostWithoutAuth } from "../../services/HttpService";

function Auth() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();

    const handleUsername = (value) => {
        setUsername(value);
    };

    const handlePassword = (value) => {
        setPassword(value);
    };

    const sendRequest = (path) => {
        PostWithoutAuth(("/auth/"+path), {
            userName : username, 
            password : password,
          })
          .then((res) => {
            if (res.ok) {  
                return res.json();
            } else {
                throw new Error("Giriş/Kayıt başarısız oldu.");
            }
        })
          .then((result) => {localStorage.setItem("tokenKey",result.accessToken);
                            localStorage.setItem("refreshKey",result.refreshToken);
                            localStorage.setItem("currentUser",result.userId);
                            localStorage.setItem("userName",username)})
          .catch((err) => {
                                console.error(err); 
                                alert("Bir hata oluştu. Lütfen tekrar deneyin.");
                            });
    };

    const handleButton = (path) => {
        sendRequest(path);
        setUsername("");
        setPassword("");
        console.log(localStorage);
        history.push("/");
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 50 }}>
            {/* Username Input */}
            <FormControl style={{ width: "300px", marginBottom: 20 }}>
                <InputLabel htmlFor="username">Kullanıcı adı veya E-mail</InputLabel>
                <Input id="username" onChange={(i) => handleUsername(i.target.value)} />
            </FormControl>

            {/* Password Input */}
            <FormControl style={{ width: "300px", marginBottom: 20 }}>
                <InputLabel htmlFor="password">Şifre</InputLabel>
                <Input id="password" type="password" onChange={(i) => handlePassword(i.target.value)} />
            </FormControl>

            {/* Buttons */}
            <div style={{ display: "flex", gap: 10 }}>
                <Button
                    variant="contained"
                    style={{
                        background: "linear-gradient(45deg,rgb(45, 157, 249) 30%,rgb(51, 210, 246) 90%)",
                        color: "white",
                    }}
                    onClick={() => handleButton("register")}
                >
                   Kayıt ol
                </Button>
                <Button
                    variant="contained"
                    style={{
                        background: "linear-gradient(45deg,rgb(45, 157, 249) 30%,rgb(51, 210, 246) 90%)",
                        color: "white",
                    }}
                    onClick={() => handleButton("login")}
                >
                    Oturum aç
                </Button>
            </div>

            <FormHelperText style={{ marginTop: 10 }}>Zaten kayıtlı mısınız?</FormHelperText>
        </div>
    );
}

export default Auth;