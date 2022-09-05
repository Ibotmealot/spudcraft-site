/*!
 * Quara Theme by OllieJW (https://olliejw.me)
 * License - https://olliejw.me/tos
 */

function copyIP() {
    var before = document.getElementById("ip").innerText
    var ip = document.getElementById("ip")
    var range = document.createRange()
    range.selectNode(ip)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
    document.execCommand("copy")
    window.getSelection().removeAllRanges()
    // Change Text
    ip.innerText = ip_copied
    setTimeout(function () {
        ip.innerText = before
    }, 1000)
}

window.onload = async function () {
    var template = document.getElementById("template").innerHTML
    var compiled_template = Handlebars.compile(template)
    var rendered = compiled_template({
        server_name: server_name,
        server_ip: server_ip,
    })
    document.getElementById("target").innerHTML = rendered

    // MC API
    const status_message = document.querySelector(".server-status")
    const status_pluralize = document.querySelector(".server-status-pluralize")
    const status_container = document.querySelector(".server-status-container")
    const response = await fetch(
        "https://api.mcstatus.io/v2/status/java/play.spudcraft.org"
    )
    const data = await response.json()
    if (!data)
        status_container.innerHTML =
            "Error getting server status of <span class='info'>" +
            server_ip +
            "</span><br><span class='info' style='color:#ff4545;font-size:.5em;'>" +
            err
    else if (data.online == false) {
        status_container.innerHTML =
            "Server is <span class='info' style='color:#ff4545'>offline</span>."
    } else {
        status_message.innerText = `${data.players.online}`
        status_pluralize.innerText = `${
            data.players.online == 1 ? "player" : "players"
        }`
    }
}

function staff(name, uuid, rank) {
    let staffTemplate = $("#staff-template")
        .html()
        .replaceAll("{{ name }}", name)
        .replaceAll("{{ rank }}", rank)
        .replaceAll("{{ uuid }}", uuid)

    setTimeout(function () {
        $("#staff").append(staffTemplate)
    }, 500)
}

function vote(service, image, link) {
    let voteTemplate = $("#vote-template")
        .html()
        .replaceAll("{{ service }}", service)
        .replaceAll("{{ image }}", image)
        .replaceAll("{{ link }}", link)

    setTimeout(function () {
        $("#vote").append(voteTemplate)
    }, 500)
}
