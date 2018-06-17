# Vagrant
> Setup a development environment for the project


## Prerequisites

Install [Vagrant]( https://www.vagrantup.com/ "Vagrant Homepage" )
Install [VirtualBox]( https://www.virtualbox.org/ "VirtualBox homepage" ) or alternatively VMWare.


## Run vagrant

```
$> cd root/vagrant.d  # root is the root of your project
$> vagrant up         # Start vagrant
$> vagrant ssh        # Log in
```

## How to access the project on vagrant?

Using this provisionning, you can access the project via `cd /project`

## Shared directory - caution

It happened to me only once, but once is enough. My directory was not properly mounted (linked) on my vagrant machine.
Therefore the modification I was doing were not sync on vagrant, and I could therefore not use my application/test it.

To fix it, I restarted my vagrant:
```
$> vagrant halt
$> vagrant up
```

You can also use `vagrant reload`. To verify.
If this does not solve your issue, please ask our friend [Google](https://google.com)