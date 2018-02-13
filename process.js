const OS = getOS();

const ENV = {
    OS_NAME: OS,
    WIN:     OS.indexOf('win') >= 0,
    UNIX:    OS.indexOf('nix') >= 0 || OS.indexOf('nux') >= 0 || OS.indexOf('aix') >= 0,
    MAC:     OS.indexOf('mac') >= 0,
    SOLARIS: OS.indexOf('sunos') >= 0
};

const shell = ENV.WIN ? ['cmd', '/c'] : ['bash', '-c'];

function getOS() {
    return java.lang.System.getProperty("os.name").toLowerCase() + '';
}

function readFully(input) {
    var baos = new java.io.ByteArrayOutputStream();
    while ((c = input.read()) != -1) {
        baos.write(c);
    }
    input.close();
    baos.close();

    return baos.toString() + '';
}

function exec(command) {
    var processBuilder = new java.lang.ProcessBuilder();
    
    processBuilder.command(shell.concat([command]));
    
    var process = processBuilder.start();

    process.waitFor();

    var input = process.getInputStream();
    
    return readFully(input);

}

// console.log(exec('ls -liath | grep index'));

exports  = {
    ENV: ENV,
    exec: exec
};