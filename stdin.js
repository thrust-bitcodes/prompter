var buffer = new java.io.BufferedReader(new java.io.InputStreamReader(java.lang.System.in));

exports = {
    read: function() {
        return java.lang.System.in.read();
    },

    readLine: function() {
        return buffer.readLine();
    },

    readKey: function() {
        var i = 0;

        do {
            var c = java.lang.System.in.read();

            i = (i << 8) | c;
        } while (java.lang.System.in.available())

        return i;
    },

    print: function(text) {
        java.lang.System.out.print(text);
    }
};