---
title: Clicking a link - what happens next?
date: 2021-10-03
status: live
excerpt: Have you ever questioned what happens when you click a <a> tag on a website? How does your browser know what to get? Where to go? I hope to explain the core fundamentals by the end of this post.
alt: An 8bit image of a 90's style computer
---

## TL;DR

- We click the URL
- The browser resolves that URL into an IP Address via DNS.
- A TCP connection is initiated between the client and server
- The connection is formalized and Requests & Responses can be sent.

---

To start, let's set a simple scene. We have a webpage and on that webpage is a link to another webpage. What happens when we click that link?

Firstly, let's remember that the link is made up of a Uniformed Resource Locator **(URL)**. A URL is simply an identifier for that resource, we use them because they’re much more human-readable than the destination address **(IP address)**. Most of the time we would see a URL be prefixed with a type of protocol, the most common one being the HyperText Transfer Protocol **(HTTP)** but you could also see URL be prefixed by others like MailTo or File Transfer Protocol **(FTP)** and more.

## Get the IP address

So we’ve clicked the URL, now what? Now the browser needs to resolve the URL to an IP address. To do this the computer will use a Domain Name Server **(DNS)**. DNS’s are like a phonebook or for the more younger generation, it's like your contacts app. This will resolve the URL into an IP address.

But that's just an overview, to resolve the URL it will first check the **local browser cache** to see if it's resolved recently, then it will check the **Operating system cache** followed by your **Router cache**. If all these fail then the browser will make a request to the **Resolve server** (which is usually your ISP), to check their **ISP cache**, after which is the **root name server**. The Root server will know where you can get that data from and will direct your request to that location which will be a **Top Level Domain server** **(TLD)** and finally the request will be directed to an **Authoritative name server** which will know everything about the domain name.

![The order in which a DNS lookup happens](../../assets/images/2021-10-03-clicking-a-link-what-happens-next/01-clicking-a-link.webp)

And now we’ve done it. https://matty.dev has been resolved to be 127.0.0.1. Great, now we’ve got the IP address we can communicate with that address, here's where a protocol called **Transmission Control Protocol (TCP)** comes in.

## Initalise the connection

TCP is a protocol to ensure reliable transmission of packets between a sender and receiver, to do this the receiver has to acknowledge **(ACK)** every packet it receives and if it ever misses one, the sender will resend it. The TCP protocol starts with the **TCP three-way handshake** which establishes the connection between the sender and receiver. To do this the sender will send an SYN the receiver will send an **ACK** then **SYN**, finally the sender will reply with an **ACK**.

![The TCP connection handshake visualised](../../assets/images/2021-10-03-clicking-a-link-what-happens-next/02-clicking-a-link.webp)

The connection has now been made and an HTTP request can be sent to the server and the server can respond with data.

Fundamentally speaking, that's it. We get the IP address from a DNS lookup and then initialize a TCP connection with the receiver, this enables the computer to start sending and receiving data in TCP packets. For anyone interested I would also recommend looking at how TCP handles packet transmission and packet loss and some further reading with comparing **User Datagram Protocol (UDP)** and TCP.
