# [nginx](http://nginx.org/en/docs/)

## 安装

- 下载nginx 压缩包 ，解压

- 运行解压后文件下的 ``` configure ```, 如果有如下报错需要安装 pcre

```sh
./configure: error: the HTTP rewrite module requires the PCRE library.
You can either disable the module by using --without-http_rewrite_module
option, or install the PCRE library into the system, or build the PCRE library
statically from the source with nginx by using --with-pcre=<path> option.

# dnf install pcre pcre-devel

# 之后在运行 

# ./configure


# 安装 

# make install

```

- 运行 nginx  ```sudo /usr/local/nginx/sbin/nginx```

- 终止 nginx 命令

```sh

# 进程完成当前工作后再停止
# /usr/local/nginx/sbin/nginx -s quit

# 无论进程是否在工作，都直接停止进程。
# /usr/local/nginx/sbin/nginx -s stop

# kill命令
kill -s QUIT 1234  # (数字是进程的pid)

```

- 其他命令 

```sh

# 重新加载配置
# /usr/local/nginx/sbin/nginx -s reload

# 重新打开日志文件
# /usr/local/nginx/sbin/nginx -s reopen

# 为了获取所有正在运行的nginx进程的列表，ps 可以使用该实用程序，例如，通过以下方式使用：
ps -ax | grep nginx

```

## nginx.conf 基本配置说明

```sh

#运行用户
user nobody;
#启动进程,通常设置成和cpu的数量相等
worker_processes  1;
 
#全局错误日志及PID文件
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;
 
#pid        logs/nginx.pid;
 
#工作模式及连接数上限
events {
    #epoll是多路复用IO(I/O Multiplexing)中的一种方式,
    #仅用于linux2.6以上内核,可以大大提高nginx的性能
    use   epoll; 
 
    #单个后台worker process进程的最大并发链接数    
    worker_connections  1024;
 
    # 并发总数是 worker_processes 和 worker_connections 的乘积
    # 即 max_clients = worker_processes * worker_connections
    # 在设置了反向代理的情况下，max_clients = worker_processes * worker_connections / 4  为什么
    # 为什么上面反向代理要除以4，应该说是一个经验值
    # 根据以上条件，正常情况下的Nginx Server可以应付的最大连接数为：4 * 8000 = 32000
    # worker_connections 值的设置跟物理内存大小有关
    # 因为并发受IO约束，max_clients的值须小于系统可以打开的最大文件数
    # 而系统可以打开的最大文件数和内存大小成正比，一般1GB内存的机器上可以打开的文件数大约是10万左右
    # 我们来看看360M内存的VPS可以打开的文件句柄数是多少：
    # $ cat /proc/sys/fs/file-max
    # 输出 34336
    # 32000 < 34336，即并发连接总数小于系统可以打开的文件句柄总数，这样就在操作系统可以承受的范围之内
    # 所以，worker_connections 的值需根据 worker_processes 进程数目和系统可以打开的最大文件总数进行适当地进行设置
    # 使得并发总数小于操作系统可以打开的最大文件数目
    # 其实质也就是根据主机的物理CPU和内存进行配置
    # 当然，理论上的并发总数可能会和实际有所偏差，因为主机还有其他的工作进程需要消耗系统资源。
    # ulimit -SHn 65535
 
}
 
 
http {
    #设定mime类型,类型由mime.type文件定义
    include    mime.types;
    default_type  application/octet-stream;
    #设定日志格式
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
 
    access_log  logs/access.log  main;
 
    #sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件，
    #对于普通应用，必须设为 on,
    #如果用来进行下载等应用磁盘IO重负载应用，可设置为 off，
    #以平衡磁盘与网络I/O处理速度，降低系统的uptime.
    sendfile     on;
    #tcp_nopush     on;
 
    #连接超时时间
    #keepalive_timeout  0;
    keepalive_timeout  65;
    tcp_nodelay     on;
 
    #开启gzip压缩
    gzip  on;
    gzip_disable "MSIE [1-6].";
 
    #设定请求缓冲
    client_header_buffer_size    128k;
    large_client_header_buffers  4 128k;
 
 
    #设定虚拟主机配置
    server {
        #侦听80端口
        listen    80;
        #定义使用 www.nginx.cn访问
        server_name  www.nginx.cn;
 
        #定义服务器的默认网站根目录位置
        root html;
 
        #设定本虚拟主机的访问日志
        access_log  logs/nginx.access.log  main;
 
        #默认请求
        location / {
            
            #定义首页索引文件的名称
            index index.php index.html index.htm;   
 
        }
 
        # 定义错误提示页面
        error_page   500 502 503 504 /50x.html;
        location = /50x.html {
        }
 
        #静态文件，nginx自己处理
        location ~ ^/(images|javascript|js|css|flash|media|static)/ {
            
            #过期30天，静态文件不怎么更新，过期可以设大一点，
            #如果频繁更新，则可以设置得小一点。
            expires 30d;
        }
 
        #PHP 脚本请求全部转发到 FastCGI处理. 使用FastCGI默认配置.
        location ~ .php$ {
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_index index.php;
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
            include fastcgi_params;
        }
 
        #禁止访问 .htxxx 文件
            location ~ /.ht {
            deny all;
        }
 
    }
}

```


### nginx编译选项说明

- make是用来编译的，它从Makefile中读取指令，然后编译。

- make install是用来安装的，它也从Makefile中读取指令，安装到指定的位置。

- configure命令是用来检测你的安装平台的目标特征的。它定义了系统的各个方面，包括nginx的被允许使用的连接处理的方法，比如它会检测你是不是有CC或GCC，并不是需要CC或GCC，它是个shell脚本，执行结束时，它会创建一个Makefile文件。nginx的configure命令支持以下参数：

命令  |  描述  |  默认(目录/名称)
--|--|--|--
``` --help ``` |   打印帮助信息  | 
``` --prefix=path ``` |   定义将保留服务器文件的目录。此相同目录还将用于设置所有相对路径 configure (库原路径除外)和 nginx.conf 配置文件中。 |    /usr/local/nginx 
``` --sbin-path=path ``` |   设置 nginx 可执行文件的名称。此名称仅在安装期间使用。  |    prefix/sbin/nginx
``` --modules-path=path ``` |    定义将在其中安装 nginx 动态模块的目录。默认使用 |    prefix/modules   
``` --config-path=path ``` |    设置配置文件名称   |    prefix/config/nginx.conf   
``` --error-log-path=path ``` |    设置主要错误、警告和诊断文件的名称。安装后可以在nginx.conf 中使用 error_log 指令在配置文件中更改文件名   |    prefix/logs/error.log  
``` --pid-path=path ``` |    设置 nginx.pid 将存储主进程的进程id的文件名。安装后，可以在nginx.conf 中重新使用 pid 指令配置   |    prefix/logs/nginx.pid 
``` --lock-path=path ``` |    为锁定的文件名称设置前缀。安装后，可以在 nginx.conf 中使用 lock_file 指令配置   |    prefix/logs/nginx.lock
``` --user=name ``` |   设置一个非 root 用户的名称，控制nginx 的使用用户。可以在 nginx.conf 中重新配置 name 指令   |    nobody
``` --group=name ``` |   设置一个控制 nginx 的使用用户组。可以在 nginx.conf 中重新配置 group 指令  |    nobody
``` --build=name ``` |   设置一个可选的 nginx 构建名称
``` --builddir=path ``` |   设置构建目录
``` --with-select_module ``` <br/> ``` --without-select_module ``` |   启用构建允许服务器使用 select()方法的模块。如果平台不支持kqueue 、epoll 或 /dev/poll 等更合适的方法，则会自动构建此模块
``` --with-poll_module ``` <br/> ``` --without-poll_module ``` |   启用构建允许服务器使用 poll()方法的模块。如果平台不支持kqueue 、epoll 或 /dev/poll 等更合适的方法，则会自动构建此模块
``` --with-threads ```   |   启用线程池
``` --with-file-aio ```   |   支持在FreeBSD 和 linux 上使用 asynchronous file I/O(AIO)
``` --with-http_ssl_module ```   |   启用构建将 HTTPS protocol support 模块。默认未构建这个模块，需要OpenSSL 库来构建和运行此模块
``` --with-http_v2_module ```   |   启用 HTTP/2 模块，这个模块默认没有启用
``` --with-http_realip_module ```   |   启用 ngx_http_realip_module 该模块将客户端地址更改为指定的 Header 字段中发送的地址。 默认未构建
``` --with-http_addition_module ```   |   启用 ngx_http_addition_module  该模块在响应之前或之后添加文本
``` --with-http_xslt_module ```<br/> ``` --with-http_xslt_module=dynamic ```   |   启用 ngx_http_xslt_module  该模块使用一个或多个 XSLT 样式表转换 XML 相应。默认未构建。这个依赖 libxml2 and libxslt 库
``` --with-http_image_filter_module ```<br/> ``` --with-http_image_filter_module=dynamic ```   |   启用 ngx_http_image_filter_module  可以转换 JPEG、GIF、PNG和 WebP 格式的图像。默认未构建。
``` --with-http_geoip_module ```<br/> ``` --with-http_geoip_module=dynamic ```   |   启用 ngx_http_geoip_module  该模块根据客户端ip地址和预编译的 MaxMind 数据库创建变量。默认未构建。
``` --with-http_sub_module ```  |   启用 ngx_http_sub_module  该 模块通过将一个指定的字符串替换为另一个指定的字符串来修改响应。默认情况下未构建此模块。
``` --with-http_dva_module ```  |   启用 ngx_http_dva_module  该 模块通过WebDAV协议提供文件管理自动化。默认情况下未构建此模块。
``` --with-http_mp4_module ```  |   启用 ngx_http_mp4_module  该 模块为MP4文件提供伪流服务器端支持。默认情况下未构建此模块。
``` --with-http_gunzip_module ```  |   支持为不支持“ gzip”编码方法的客户端构建ngx_http_gunzip_module 模块，该 模块使用“ Content-Encoding: gzip” 解压缩响应。默认情况下未构建此模块。
``` --with-http_auth_request_module ```  |   允许构建ngx_http_auth_request_module 模块，该 模块基于子请求的结果实现客户端授权。默认情况下未构建此模块。
``` --with-http_random_index_module ```  |   支持构建ngx_http_random_index_module 模块，该 模块处理以斜杠（' /'）结尾的请求，并从目录中选择一个随机文件作为索引文件。默认情况下未构建此模块。
``` --with-http_secure_link_module ```  |   启用构建 ngx_http_secure_link_module 模块。默认情况下未构建此模块。
``` --with-http_degradation_module ```  |   启用构建 ngx_http_degradation_module模块。默认情况下未构建此模块。
``` --with-http_slice_module ```  |   支持构建ngx_http_slice_module 模块，该 模块将请求拆分为子请求，每个子请求返回一定范围的响应。该模块提供了更有效的大响应缓存。默认情况下未构建此模块。
``` --with-http_stub_status_module ```  |   支持构建ngx_http_stub_status_module 模块，该 模块提供对基本状态信息的访问。默认情况下未构建此模块。
``` --without-http_charset_module   ```  |   禁用构建ngx_http_charset_module 模块，该 模块将指定的字符集添加到“ Content-Type”响应头字段中，并且可以将数据从一个字符集转换为另一个字符集。
``` --without-http_gzip_module  ```  |   禁用构建可压缩 HTTP服务器响应的模块。zlib库是构建和运行此模块所必需的。
``` --without-http_ssi_module ```  |   禁用构建 处理通过SSI（服务器端包含）命令的 ngx_http_ssi_module模块的响应。
``` --without-http_userid_module ```  |   禁用构建ngx_http_userid_module 模块，该 模块设置适用于客户端标识的cookie。
``` --without-http_auth_basic_module ```  |   禁用构建ngx_http_auth_basic_module 模块，该 模块允许通过使用“ HTTP基本身份验证”协议验证用户名和密码来限制对资源的访问。
``` --without-http_mirror_module ```  |   禁用构建ngx_http_mirror_module 模块，该 模块通过创建后台镜像子请求来实现原始请求的镜像。
``` --without-http_autoindex_module ```  |   禁用构建 ngx_http_autoindex_module 模块，以处理以斜杠（' /'）结尾的请求，并在ngx_http_index_module模块找不到索引文件的情况下生成目录列表 。
``` --without-http_map_module ```  |   禁用构建ngx_http_map_module 模块，该 模块创建的变量的值取决于其他变量的值。
``` --without-http_split_clients_module ```  |   禁用构建ngx_http_split_clients_module 模块，该 模块创建用于A / B测试的变量。
``` --without-http_referer_module ```  |   禁用构建ngx_http_referer_module 模块，该 模块可以阻止对“ Referer”标头字段中具有无效值的请求的站点访问。
``` --without-http_rewrite_module ```  |   禁用构建允许HTTP服务器 重定向请求并更改请求URI的模块。构建和运行此模块需要PCRE库。
``` --without-http_proxy_module ```  |   禁用构建HTTP服务器 代理模块。
``` --without-http_fastcgi_module ```  |   禁用构建 将请求传递到FastCGI服务器的 ngx_http_fastcgi_module模块。
``` --without-http_uwsgi_module ```  |   禁用构建 将请求传递到uwsgi服务器的 ngx_http_uwsgi_module模块。
``` --without-http_scgi_module ```  |   禁用构建 将请求传递到SCGI服务器的 ngx_http_scgi_module模块。
``` --without-http_grpc_module ```  |   禁用构建 将请求传递到gRPC服务器的 ngx_http_grpc_module模块。
``` --without-http_memcached_module  ```  |   禁用构建ngx_http_memcached_module 模块，该 模块从memcached服务器获取响应。
``` --without-http_limit_conn_module  ```  |   禁用构建ngx_http_limit_conn_module 模块，该 模块限制每个键的连接数，例如，单个IP地址的连接数。
``` --without-http_empty_gif_module  ```  |   禁用构建发出单像素透明GIF的模块 。
``` --without-http_browser_module  ```  |   禁用构建ngx_http_browser_module 模块，该 模块创建的变量的值取决于“ User-Agent”请求标头字段的值。
``` --without-http_upstream_hash_module  ```  |  禁用构建实现哈希 负载平衡方法的模块 。
``` --without-http_upstream_ip_hash_module  ```  |  禁用构建实现ip_hash 负载平衡方法的模块 。
``` --without-http_upstream_least_conn_module  ```  |  禁用构建实现了minimum_conn 负载平衡方法的模块 。
``` --without-http_upstream_keepalive_module  ```  |  禁用构建一个模块来提供 对上游服务器连接的缓存。
``` --without-http_upstream_zone_module  ```  |  禁用构建模块，该模块可以将上游组的运行时状态存储在共享内存 区域中。
``` --with-http_perl_module  ``` <br /> ```--with-http_perl_module=dynamic ```  |  支持构建 嵌入式Perl模块。默认情况下未构建此模块。
``` --with-perl_modules_path=path  ```  |  定义一个目录，该目录将保留Perl模块。
``` --with-perl=path ```  |  设置Perl二进制文件的名称。
``` --http-log-path=path ```  |  设置HTTP服务器的主请求日志文件的名称。安装后，可以始终nginx.conf使用access_log伪指令在配置文件中 更改文件名 。默认情况下，文件名为 prefix/logs/access.log。
``` --http-client-body-temp-path=path ```  |  定义用于存储包含客户端请求正文的临时文件的目录。安装后，可以始终nginx.conf使用client_body_temp_path 指令在配置文件中 更改目录 。默认情况下，目录名为 prefix/client_body_temp。
``` --http-proxy-temp-path=path ```  |  定义一个目录，用于存储包含从代理服务器接收到的数据的临时文件。安装后，可以始终nginx.conf使用proxy_temp_path 指令在配置文件中 更改目录 。默认情况下，目录名为 prefix/proxy_temp。
```  --http-fastcgi-temp-path=path  ```  |  定义一个目录，用于存储包含从FastCGI服务器接收到的数据的临时文件。安装后，可以始终nginx.conf使用fastcgi_temp_path 指令在配置文件中 更改目录 。默认情况下，目录名为 prefix/fastcgi_temp。
```  --http-uwsgi-temp-path=path  ```  |  定义一个目录，用于存储带有从uwsgi服务器接收到的数据的临时文件。安装后，可以始终nginx.conf使用uwsgi_temp_path 指令在配置文件中 更改目录 。默认情况下，目录名为 prefix/uwsgi_temp。
```  --http-scgi-temp-path=path  ```  |  定义一个目录，用于存储带有从SCGI服务器接收到的数据的临时文件。安装后，可以始终nginx.conf使用scgi_temp_path 指令在配置文件中 更改目录 。默认情况下，目录名为 prefix/scgi_temp。
```   --without-http  ```  | 禁用HTTP服务器
```   --without-http-cache  ```  |   禁用HTTP缓存。
```   --with-mail ``` <br/> ``` --with-mail=dynamic  ```  |   启用POP3 / IMAP4 / SMTP 邮件代理服务器。
```   --with-mail_ssl_module  ```  |   支持构建一个模块，该模块 向邮件代理服务器添加 SSL / TLS协议支持。默认情况下未构建此模块。需要OpenSSL库来构建和运行此模块。
```   --without-mail_pop3_module  ```  |   在邮件代理服务器中 禁用POP3协议。
```   --without-mail_imap_module  ```  |   在邮件代理服务器中 禁用IMAP协议
```   --without-mail_imap_module  ```  |   在邮件代理服务器中 禁用SMTP协议。
```   --with-stream ``` <br/>```--with-stream=dynamic ```  | 支持构建 用于通用TCP / UDP代理和负载平衡的 流模块。默认情况下未构建此模块。
```   --with-stream_ssl_module ```  |   支持构建一个模块，该模块 向流模块添加 SSL / TLS协议支持。默认情况下未构建此模块。需要OpenSSL库来构建和运行此模块。
```   --with-stream_realip_module  ```  |   启用构建ngx_stream_realip_module 模块的功能，该 模块将客户端地址更改为PROXY协议标头中发送的地址。默认情况下未构建此模块。
```   --with-stream_geoip_module ```  <br/>```--with-stream_geoip_module=dynamic  ```  |   支持构建ngx_stream_geoip_module 模块，该 模块根据客户端IP地址和预编译的MaxMind数据库创建变量 。默认情况下未构建此模块。
```   --with-stream_ssl_preread_module  ```  |   支持构建ngx_stream_ssl_preread_module 模块，该 模块允许从ClientHello 消息中提取信息， 而无需终止SSL / TLS。默认情况下未构建此模块。
```  --without-stream_limit_conn_module  ```  |   禁用构建ngx_stream_limit_conn_module 模块，该 模块限制每个键的连接数，例如，单个IP地址的连接数。
```  --without-stream_access_module  ```  |   禁用构建ngx_stream_access_module 模块，该 模块允许限制对某些客户端地址的访问。
```  --without-stream_geo_module  ```  |   禁用构建ngx_stream_geo_module 模块，该 模块创建的变量值取决于客户端IP地址。
```  --without-stream_map_module  ```  |   禁用构建ngx_stream_map_module 模块，该 模块创建的变量值取决于其他变量的值。
```  --without-stream_split_clients_module  ```  |   禁用构建ngx_stream_split_clients_module 模块，该 模块创建用于A / B测试的变量。
```  --without-stream_return_module  ```  |   禁用构建ngx_stream_return_module 模块，该 模块向客户端发送一些指定的值，然后关闭连接。
```  --without-stream_upstream_hash_module  ```  |   禁用构建实现哈希 负载平衡方法的模块 。
```  --without-stream_upstream_least_conn_module  ```  |   禁用构建实现了minimum_conn 负载平衡方法的模块 
```  --without-stream_upstream_zone_module  ```  |   禁用构建模块，该模块可以将上游组的运行时状态存储在共享内存 区域中。
```  --with-google_perftools_module  ```  |   允许构建ngx_google_perftools_module 模块，该 模块可以使用Google Performance Tools对nginx工作进程进行 性能分析。该模块适用于Nginx开发人员，默认情况下未构建。
```  --with-cpp_test_module  ```  |   启用构建 ngx_cpp_test_module模块。
```  --add-module=path  ```  |   启用外部模块。
```  --add-dynamic-module=path  ```  |   启用外部动态模块。
```  --with-compat  ```  |   启用动态模块兼容性。
```  --with-cc=path  ```  |   设置C编译器的名称。
```  --with-cpp=path  ```  |   设置C预处理器的名称。
```  --with-cc-opt=parameters  ```  |  设置将添加到CFLAGS变量的其他参数。在FreeBSD下使用系统PCRE库时， --with-cc-opt="-I /usr/local/include" 应指定。如果select()需要增加支持的文件数量，也可以在此处指定，例如： --with-cc-opt="-D FD_SETSIZE=2048"。
```  --with-ld-opt=parameters  ```  |  设置将在链接期间使用的其他参数。在FreeBSD下使用系统PCRE库时， --with-ld-opt="-L /usr/local/lib" 应指定。
```  --with-cpu-opt=cpu  ```  |  支持按指定的CPU建设： pentium，pentiumpro， pentium3，pentium4， athlon，opteron， sparc32，sparc64， ppc64。
```  --without-pcre  ```  |  禁用PCRE库的使用。
```  --with-pcre ```  |  强制使用PCRE库。
```  --with-pcre=path ```  |  设置PCRE库源的路径。需要从PCRE站点下载并分发库分发（版本4.4 — 8.43） 。其余的由nginx的./configure和完成 make。该库对于location指令中的正则表达式支持和 ngx_http_rewrite_module 模块是必需的 。
```  --with-pcre-opt=parameters ```  |  为PCRE设置其他构建选项。
```  --with-pcre-jit ```  |   使用“及时编译”支持（1.1.12，pcre_jit指令）构建PCRE库 。
```  --with-zlib=path ```  |   设置zlib库源的路径。需要从zlib站点下载库发行版（版本1.1.3-1.2.11） 并解压缩。其余的由nginx的./configure和完成 make。ngx_http_gzip_module模块需要该库 。
```  --with-zlib-opt=parameters ```  |   为zlib设置其他构建选项。
```  --with-zlib-asm=cpu ```  |   使得能够使用指定的CPU中的一个优化的zlib汇编源程序： pentium，pentiumpro。
```  --with-libatomic ```  |   强制使用libatomic_ops库。
```  --with-libatomic=path  ```  |   设置libatomic_ops库源的路径。
```  --with-openssl=path  ```  |   设置OpenSSL库源的路径。
```  --with-openssl-opt=parameters  ```  |   为OpenSSL设置其他构建选项。
```  --with-debug  ```  |   启用调试日志


参数用法示例（所有这些都需要在一行中键入）：

```sh

./configure
    --sbin-path=/usr/local/nginx/nginx
    --conf-path=/usr/local/nginx/nginx.conf
    --pid-path=/usr/local/nginx/nginx.pid
    --with-http_ssl_module
    --with-pcre=../pcre-8.43
    --with-zlib=../zlib-1.2.11

```