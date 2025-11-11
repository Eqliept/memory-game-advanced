export async function timer(seconds, container) {
    return new Promise(resolve => {
        let timerSeconds = seconds;
        container.textContent = timerSeconds;

        const interval = setInterval(() => {
            timerSeconds -= 1;
            container.textContent = timerSeconds;

            if (timerSeconds <= 0) {
                clearInterval(interval);
                container.textContent = "";
                resolve("done");
            }
        }, 1000);
    });
}