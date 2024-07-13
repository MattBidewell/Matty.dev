---
title: Dotfile Management using Stow
date: 2024-07-12
status: live
excerpt:
alt:
---

# Dotfile Management using Stow

What do changing jobs, getting a new device, or resetting your devices have in common? You need to configure those pesky DotFiles. Everyone knows that the only way you're going to be productive is by having your setup exactly the way you want it, so you spend the next three weeks telling your PM that you're productivity is low because your Neovim setup isn't exactly the way it was on your 2011 beat up MacBook pro, yada, yada, yada we've all been there.

Recently I was in a similar boat. I turned on my MacBook Pro to find I never updated all my aliases, my ZSH config was just _wrong_. I'd been so tied up on my full-time job laptop that my personal machine had been severely neglected. It was stuck in the 1920s whilst my work machine was in 2020.

I initially, had the idea of writing a shell script to take DotFiles from a Github repo and simply 'cp' them into the relative directories. Well, that was a pretty crap idea. How would I effectively manage version control? I'd have to copy any changes back to the source repo. Scrap that. I want it easy. I want it centralised.

Then I had the smart idea of using symbolic links. A symbolic link for those who don't know is:

> A symbolic link, also known as a symlink or soft link, is a special type of file that points to another file or directory in the file system.

Yes, that's a ChatGPT definition, don't shoot me.

Symbolic links allow you to point to another file in a separate part of the file system. This allows you to appear to have the file in one directory when it is in fact in another. This would be great for DotFiles. I could keep them in a Git repo and then write a cheeky little script to create symbolic links in the directory where I want them!


```shell
$ tree -a ../
└── dotFiles
    └── .zshrc

$ ln -s ./dotFiles/.zshrc .zshrc


$ tree -a ../
├── .zshrc -> dotFiles/.zshrc
└── dotFiles
    └── .zshrc
```

Do you see the problem? It's tedious. What happens if I have 100's of DotFiles? I could hear my peer's voices shouting: "This isn't going to scale, Matt!".

Using Symbolic links is still the solution I just needed to find the right management tool, I could roll my own but surely in the past 30 years of Linux Symbolic link management has been solved.

## Stow

In comes [Stow](https://www.gnu.org/software/stow/manual/stow.html).
A self-described "Symlink farm manager". Whatever that means, sounds right. But the key point is "makes them appear to be installed in a single directory tree."

This means it will take the shape of the directory at the source and replicate it at the target. This is perfect for dealing with nested DotFile configurations (like I do!)

Looking at the use, this looks like it would work

```shell
$ tree -a ../
└── dotFiles
    └── .zshrc

$ stow dotFiles

$ tree -a ../
├── .zshrc -> dotFiles/.zshrc
└── dotFiles
    └── .zshrc
```

In this example, we ran `stow dotFiles` in the directory above `dotFiles`. This would create a symbolic link in the directory above to the `.zshrc` file in the `dotFiles` directory.

But, as know with DotFiles and life in general, they're a mess and never always stored in the same place. We might also want to expand it even further and deal with generic config files. Can we do that with Stow? yes. Why yes you can.

``` shell
$ tree
└── vscode
    └── settings.json

$ stow -t ~/Library/Application\ Support/Code/User vscode
```

In this example above we're using stow to create a symbolic link in the `~/Library/Application Support/Code/User` directory to the `vscode` directory in the current directory. Which will in turn create a symbolic link to the `settings.json` file. This meaning we have git control on settings.json and can easily manage it across multiple machines. (I know you can use the sync settings feature in VSCode, but I like to have control over my settings)

## Putting it all together

So I have control of my target and source, I can create symbolic links at mass and it maintains the source directory shape. From this I can end up with a source directory looking like this:

```shell
.
├── .git
│   └── ... git repo config
├── .gitignore
├── .gitmodules
├── .stow-local-ignore
├── Brew/
│   ├── Brewfile
├── README.md
├── git/
│   ├── .gitconfig
│   └── .gitconfig-work
├── install.sh
├── vscode/
│   └── settings.json
└── zsh/
    └── .zshrc
```

Note how I've decided to use separate directories for each collection of configurations I have. The VSCode configurations are in the `vscode` directory, the Git configurations are in the `git` directory and the ZSH configurations are in the `zsh` directory. This is just a personal preference, you could have all the configurations in the root directory if you wanted.

## Automating the process

However, I probably still need to maintain an install.sh script. This is fine tho, its fairly simple and just does some basic stow commands.

```shell
$ stow git
$ stow -t ~/Library/Application\ Support/Code/User vscode
$ stow zsh
```
This will create the symbolic links in the correct directories and maintain the source directory shape. This is perfect for me, I can now manage all my DotFiles in a single Git repo and have them easily installed on any machine I want.

But what if I'm on a new laptop and Stow isn't installed? I could run `brew install stow`. But what if Brew isn't installed?!

You can see the can of worms here.. Let's automate it...

```shell
if ! command -v brew &> /dev/null; then
  echo "[Homebrew] Homebrew not found, installing..."
  # run brew install but mute the output
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" > /dev/null
else
  echo "[Homebrew] Homebrew is already installed."
fi

brew bundle --file=./Brew/Brewfile
```

Here the script checks that Brew is installed, if it's not then it installs it. We then run `Brew Bundle` with the target of my Bundle file to automatically go and install all the apps, CLI tools, fonts and even VSCode extensions I use.

The Brewfile looks like this:

```shell
brew "stow"
# other brew installs
```

Now I have a single script and repo that will allow me to:

- Install Brew
- Install apps/CLI tools/fonts/VSCode extensions I use
- Link all my DotFiles to the correct directories
- Keep a centralised repo of all my DotFiles

## The big takeaway of this?

I have a massive love-hate relationship with dotfiles and machine management... I'm sure there are probably better ways of doing this, but having all my machines equal will mean I can get to some form of productivity much quicker.

I would highly recommend doing an activity like this, it will allow you to really know your development environment and what you like or don't like. If you ship the default everything, that's fine! If you're like me and like to customise VScode/Neovim deeply then go for it. Just... don't commit your API keys please .. (talking to you [Rabbit R1](https://www.theverge.com/2024/6/26/24186614/rabbit-r1-security-flaw-api-key-codebase))

