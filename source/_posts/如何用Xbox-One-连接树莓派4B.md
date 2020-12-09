---
title: 如何用Xbox One 连接树莓派4B
date: 2020-12-09 21:26:25
tags: arvhives
---

# 前言

本来之前是打算用树莓派做嵌入式比赛的板子，但是发现没有发挥完全的用途。于是就看见了手边无用的XboxOne，所以就想拿手柄连接树莓派，然后之后还可以打打游戏或者改装成小车什么的。

# 环境准备

### 1. 查看树莓派内核版本
![](https://gitee.com/YSXCC/MDImage/raw/master/img/树莓派内核版本.png)

### 2. 查看/usr/src下有没有对应的内核头（一定要一模一样），这个对编译驱动模块很重要
![](https://gitee.com/YSXCC/MDImage/raw/master/img/20201206213933.png)

### 3. 如果没有找到对应的内核头，就要去[树莓派的github](https://github.com/raspberrypi/linux)上下载
![](https://gitee.com/YSXCC/MDImage/raw/master/img/20201206214524.png)

### 4. 编译内核的问题就自己去百度，大概又是一个多小时的问题，如果有就利用ln软链接指令到编译内核需要的位置

### 5. 直接用蓝牙连接树莓派虽然可以连接上，但是不能读取到数据。所以感谢Github上的一个驱动[xpadneoatar-axis/xpadneo](https://github.com/atar-axis/xpadneo)。网站上面有完整的安装过程，其他人博客也说到了这个，但是没有说明内核版本的问题，差一点都不行。

### 6. 安装完成之后用lsmod查看是否加载了这个驱动
![](https://gitee.com/YSXCC/MDImage/raw/master/img/20201206215210.png)

### 7. 这样就可以连上XboxOne了

```bash

sudo bluetoothctl

[bluetooth]# scan on

[bluetooth]# pair MAC

[bluetooth]# trust MAC

[bluetooth]# connect MAC
```

```python
import pygame

BLACK    = (   0,   0,   0)
WHITE    = ( 255, 255, 255)

class TextPrint:
    def __init__(self):
        self.reset()
        self.font = pygame.font.Font(None, 20)

    def print(self, screen, textString):
        textBitmap = self.font.render(textString, True, BLACK)
        screen.blit(textBitmap, [self.x, self.y])
        self.y += self.line_height
        
    def reset(self):
        self.x = 10
        self.y = 10
        self.line_height = 15
        
    def indent(self):
        self.x += 10
        
    def unindent(self):
        self.x -= 10
    

pygame.init()

size = [500, 700]
screen = pygame.display.set_mode(size)

pygame.display.set_caption("My Game")

done = False


clock = pygame.time.Clock()

pygame.joystick.init()
    

textPrint = TextPrint()

while done==False:

    for event in pygame.event.get(): 
        if event.type == pygame.QUIT:
            done=True
        
        if event.type == pygame.JOYBUTTONDOWN:
            print("Joystick button pressed.")
        if event.type == pygame.JOYBUTTONUP:
            print("Joystick button released.")
            
 

    screen.fill(WHITE)
    textPrint.reset()


    joystick_count = pygame.joystick.get_count()

    textPrint.print(screen, "Number of joysticks: {}".format(joystick_count) )
    textPrint.indent()
    

    for i in range(joystick_count):
        joystick = pygame.joystick.Joystick(i)
        joystick.init()
    
        textPrint.print(screen, "Joystick {}".format(i) )
        textPrint.indent()
    

        name = joystick.get_name()
        textPrint.print(screen, "Joystick name: {}".format(name) )
        
        axes = joystick.get_numaxes()
        textPrint.print(screen, "Number of axes: {}".format(axes) )
        textPrint.indent()
        
        for i in range( axes ):
            axis = joystick.get_axis( i )
            textPrint.print(screen, "Axis {} value: {:>6.3f}".format(i, axis) )
        textPrint.unindent()
            
        buttons = joystick.get_numbuttons()
        textPrint.print(screen, "Number of buttons: {}".format(buttons) )
        textPrint.indent()

        for i in range( buttons ):
            button = joystick.get_button( i )
            textPrint.print(screen, "Button {:>2} value: {}".format(i,button) )
        textPrint.unindent()
            

        hats = joystick.get_numhats()
        textPrint.print(screen, "Number of hats: {}".format(hats) )
        textPrint.indent()

        for i in range( hats ):
            hat = joystick.get_hat( i )
            textPrint.print(screen, "Hat {} value: {}".format(i, str(hat)) )
        textPrint.unindent()
        
        textPrint.unindent()

    
    pygame.display.flip()


    clock.tick(20)
    
pygame.quit ()
```