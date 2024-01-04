document.addEventListener('DOMContentLoaded', function() {
    var scripts = [
        "External JS script to be loaded inside your store."
    ];

    function loadScript(index) {
        if (index >= scripts.length) return;

        var script = document.createElement('script');
        script.src = scripts[index];
        script.onload = function() {
            console.log('Successfully loaded ' + scripts[index]);
            loadScript(index + 1);
        };

        script.onerror = function() {
            console.error('Error loading script: ' + scripts[index]);
        };

        document.head.appendChild(script);
    }

    loadScript(0);
});
