async function sendContact(e){e.preventDefault();let a=document.getElementById("nicknameInput").value,n=document.getElementById("messageInput").value,t=await fetch("https://discord.com/api/webhooks/1249376084793884692/WKDZZI1CmL_1hgFTdunP0U23m00GItGfOHoIUaHU8pNf_CnLtgczEgaIhX5p0Bw54Rjr",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({embeds:[{title:"Contact From blessunleashed.pmang.en",fields:[{name:"To",value:"<@835120160368623647>"},{name:"Sender",value:a},{name:"Message",value:n}]}]})});t.ok?(alert("Message sent!"),window.location.reload()):alert("There was an error! Try again later!")}