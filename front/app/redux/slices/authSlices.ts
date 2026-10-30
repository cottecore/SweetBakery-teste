import { Usuario } from "@/app/types/usuario";


const initialState: AuthState = {
    usuario: null,
    token: ""
}

//tem que fazer download of redux na maquina
//pegar import de payload
//pegar o cookie de login page (pegar do sor (verificar c vc tem))
const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers:{
        login:( state, action: PayLoadAction<{token:string, usuario: Usuario}>) =>{

            state.token = action.payload.token;
            state.usuario = action.payload.usuario;

        },
        logout:( state) =>{
            
        }
    }
})


