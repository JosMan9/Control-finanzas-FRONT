import "../src/components/login/loginForm.js";
import { html, render } from "lit";

const demo = document.getElementById("demo");

render(html`
  <login-form
    id="demo-login"
    @login-submit="${(e) => { console.log("Login:", e.detail); alert("Login exitoso! Email: " + e.detail.email); }}"
    @forgot-password="${() => alert("Redirigiendo a recuperacion...")}"
    @abrir-cuenta="${() => alert("Redirigiendo a registro...")}"
  ></login-form>
`, demo);
