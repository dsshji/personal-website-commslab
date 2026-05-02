document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a').forEach(function (a) {
        // check if the site is external or not
        if (a.hostname && a.hostname !== location.hostname) {
            // if the website is external then open in a new tab
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
        }
    });
});
