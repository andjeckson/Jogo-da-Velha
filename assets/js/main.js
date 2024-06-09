function medidaVp(){
  let {innerHeight, innerWidth} = window
  
  let vp = Math.min(innerWidth, innerHeight)
      vp > 500 ? vp = 500 : vp = vp
      vp  /= 3.5
      vp = Number(vp).toFixed(2)
  
  document.body.style.setProperty('--vp', vp+'px')
}

medidaVp()
var JogoDaVelha = (function(){
  'use strict'
   var game = {
       pontuacao  : {
           jogadorO: 0,
           jogadorX: 0,
           empate: 0
       },
       cedulasDisponiveis : [],
       vencedor: undefined,
       jogador : undefined,
       
       iniciar : function(){
          sortearJogador()
       }
       
   }

   
 const ESTRATEGIAS = [
 //Linha 1
     {
      seJogar: [1, 2],
      joga: 0
     },
    {
       seJogar : [0, 2],
       joga : 1
    },
    {
       seJogar : [0, 1],
       joga : 2
    },
    //Linha 2
    {
       seJogar : [4, 5],
       joga : 3
    },
    {
     seJogar : [3, 5],
     joga: 4
    },
    {
     seJogar: [3, 4],
     joga: 5
    },
    //Linha 3
    {
       seJogar : [7, 8],
       joga : 6
    },
    {
       seJogar : [6, 8],
       joga : 7
    },
    {
       seJogar : [6, 7],
       joga : 8
    },
    //estrategias verticais
    
    //Coluna 1
    {
       seJogar : [3, 6],
       joga : 0
    },
    {
       seJogar : [0, 6],
       joga : 3
    },
    {
       seJogar : [0, 3],
       joga : 6
    },
    //Coluna 2
    {
       seJogar : [4, 7],
       joga : 1
    },
    {
       seJogar : [1, 7],
       joga : 4
    },
    {
       seJogar : [1, 4],
       joga : 7
    },
    // coluna 3
    
    {
       seJogar : [5, 8],
       joga : 2
    },
    {
       seJogar : [2, 8],
       joga : 5
    },
    {
       seJogar : [2, 5],
       joga : 8
    },
 
 // Diagonal 1
 
    {
       seJogar : [4, 8],
       joga : 0
    },
    {
       seJogar : [0, 8],
       joga : 4
    },
    {
       seJogar : [0, 4],
       joga : 8
    },
  // Diagonal 2
  
    {
       seJogar : [4, 6],
       joga : 2
    },
    {
       seJogar : [2, 6],
       joga : 4
    },
    {
       seJogar : [2, 4],
       joga : 6
    },
 ]
 
 function pontuar(){
   let pontosO = document.getElementById('pontos-o')
   let pontosX = document.getElementById('pontos-x')
   let pontosE = document.getElementById('empate')
       
       pontosO.innerHTML = 'Jogador O: '+game.pontuacao.jogadorO
       pontosX.innerHTML = 'Jogador X: '+game.pontuacao.jogadorX
       pontosE.innerHTML = 'Empate: '+game.pontuacao.empate
       
       
 }
 
 function marcarVez(){
          
           let pontosO = document.getElementById('pontos-o')
           let pontosX = document.getElementById('pontos-x')
           
           game.jogador === 'x' ? 
            (pontosX.classList.add('sua-vez'),
             pontosO.classList.remove('sua-vez')) :
             (pontosO.classList.add('sua-vez'),
               pontosX.classList.remove('sua-vez'))
           
 }
 
   function sortearJogador(){
      let jogadores = ['o','x']
      let sorteio = Math.round(Math.random() * 1)
      
          game.jogador = jogadores[sorteio]
          game.jogador === 'o' ? boot() : null
          marcarVez()
   }
   
   
   const CEDULAS = document.querySelectorAll('.cedula')
         CEDULAS.forEach((cedula, i)=>{
            cedula.onclick = ()=> jogar(i)
         })
         
         function jogar(posicao) {
            const CEDULA = CEDULAS[posicao]
            const CLASSE = 'jogador-'+game.jogador
            
                  CEDULA.classList.add('preenchida')
                  CEDULA.classList.add(CLASSE)
                  verificarCedulasDisponiveis()
                  verificarVencedor()
                  verificarEmpate()
                  mudarJogador()
                  marcarVez()
           
         }
         
         function verificarCedulasDisponiveis(){
          game.cedulasDisponiveis = []
            CEDULAS.forEach((cedula, i)=>{
                if(!cedula.classList.contains('preenchida')){
                 game.cedulasDisponiveis.push(i)
                }
            })
            
         }
         function mudarJogador(){
          
            if(game.vencedor === undefined)
            {
            game.jogador = (game.jogador === 'o' ? 'x' : 'o')
            game.jogador === 'o' ? boot() : null
           
            }
         }
         
         function boot() {
            verificarCedulasDisponiveis()
            let sorteio = Math.round( Math.random() * (game.cedulasDisponiveis.length-1))
                
            let cedula = game.cedulasDisponiveis[sorteio]
                
                if( game.cedulasDisponiveis != '')
                {
                  ESTRATEGIAS.forEach((obj)=>{
                     let array = obj.seJogar
                     let cedula1 = CEDULAS[array[0]]
                     let cedula2 = CEDULAS[array[1]]
                     let cedula3 = CEDULAS[obj.joga]
                     let jogO = 'jogador-o'
                     let jogX = 'jogador-x'
                     
                      if(cedula1.classList.contains(jogX) &&
                         cedula2.classList.contains(jogX) &&
                        !cedula3.classList.contains('preenchida')){
                            cedula = obj.joga
                }else if( cedula1.classList.contains(jogO) &&
                          cedula2.classList.contains(jogO) &&
                         !cedula3.classList.contains('preenchida')){
                            cedula = obj.joga
                        }
                  })
                  
                 setTimeout(()=>{
                      jogar(cedula)
                 }, 500)
                            
                }
                
         }
         
         function verificarVencedor(){
          const JOGADAS = [
             // HORIZONTAL
             [0, 1, 2],
             [3, 4, 5],
             [6, 7, 8],
             //VERTICAL
             [0, 3, 6],
             [1, 4, 7],
             [2, 5, 8],
             //DIAGONAL
             [0, 4, 8],
             [2, 4, 6]
           ]
           
           let CLASSE = 'jogador-'+game.jogador
           JOGADAS.forEach((array)=>{
          if(CEDULAS[array[0]].classList.contains(CLASSE) &&
             CEDULAS[array[1]].classList.contains(CLASSE) &&
             CEDULAS[array[2]].classList.contains(CLASSE)){
                array.forEach((posicao)=>{
                    CEDULAS[posicao].classList.add('pintar')
                })
                game.vencedor = game.jogador
                game.pontuacao['jogador'+game.jogador.toUpperCase()]++
                
                let audio = new Audio('assets/audio/'+game.jogador+'.aac')
                    audio.play()
                    
                CEDULAS.forEach((cedula)=> cedula.classList.add('preenchida'))
                pontuar()
                zerar()
             }
           })
         }
         
         function verificarEmpate(){
           if( game.cedulasDisponiveis.length === 0 && game.vencedor === undefined){
              let audio = new Audio('assets/audio/empate.aac')
                  audio.play()
                  
              game.pontuacao.empate ++
              pontuar()
              zerar()
           }
         }
         
         function zerar(){
          setTimeout(()=>{
           CEDULAS.forEach((cedula,i)=>{
                 cedula.className = 'cedula'
           })
           game.vencedor = undefined
           sortearJogador()
         }, 2000)
      }
         return game
         
})()


window.addEventListener('DOMContentLoaded', ()=>{
    setTimeout(()=>{
       let telaDeAbertura = document.querySelector('.abertura')
           telaDeAbertura.remove()
        JogoDaVelha.iniciar()
    }, 2000)
})

