document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a').forEach(function (a) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
    });
});
