Files in this folder are copied into the iOS build directory
when the iOS app is compiled:

    <project-dir>/build/iphone

You can place files such as asset catalog files and storyboards in this
directory.

Files in this directory are copied directly on top of whatever files are already
in the build directory, so please be careful that your files don't clobber
essential project files or files from other modules.