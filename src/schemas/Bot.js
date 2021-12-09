const { Client, Collection } = require("discord.js"),
util = require("util");

class Bot extends Client {
    constructor(options) {
        super(options);

        this.wait = util.promisify(setTimeout)

        this.parseTime = function(duration) {
            var
            years = Math.floor((duration / (1000 * 60 * 60 * 24 * 7 * 365)) % 999)
            weeks = Math.floor((duration / (1000 * 60 * 60 * 24 * 7)) % 51)
            days = Math.floor((duration / (1000 * 60 * 60 * 24)) % 7),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            seconds = Math.floor((duration / 1000) % 60),

            uptime = [
                (years === 1) ? years + " " + "Jahr" : years + " " + "Jahre",
                (weeks === 1) ? weeks + " " + "Woche" : weeks + " " + "Wochen",
                (days === 1) ? days + " " + "Tag" : days + " " + "Tage",
                (hours === 1) ? hours + " " + "Stunde" : hours + " " + "Stunden",
                (minutes === 1) ? minutes + " " + "Minute" : minutes + " " + "Minuten",
                (seconds === 1) ? seconds + " " + "Sekunde" : seconds + " " + "Sekunden",
            ].filter((time) => !time.startsWith("0")).join(", ");

            console.log("parser gave "+uptime);

            return uptime;
        }

        this.parseDate = function(timestamp) {
            let date = new Date(timestamp)

            let day = (date.getDate().toString().length === 1) ? "0"+date.getDate().toString() : date.getDate().toString()
            let month = ((date.getMonth()+1).toString().length === 1) ? "0"+(date.getMonth()+1).toString() : (date.getMonth()+1).toString()

            let hours = (date.getHours().toString().length === 1) ? "0"+date.getHours().toString() : date.getHours().toString()
            let minutes = (date.getMinutes().toString().length === 1) ? "0"+date.getMinutes().toString() : date.getMinutes().toString()

            return (hours+":"+minutes+" "+day+"."+month+"."+date.getFullYear())
        }

        this.commands = new Collection()
    }

    get config() {
        return require("../../config/config.js");
    };
}

module.exports = Bot