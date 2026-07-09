export JAVA_HOME=$(/usr/libexec/java_home)
export PATH=$PATH:$JAVA_HOME/bin
export PATH=${PATH}:/usr/local/mysql/bin

# Clean PATH to remove dotenvx + Copilot CLI injectors
export PATH=$(echo $PATH | sed -e 's|:/pkg/env/global/bin||' -e 's|/pkg/env/global/bin:||' -e 's|:/Users/rheiyat/Library/Application Support/Code/User/globalStorage/github.copilot-chat/copilotCli||' -e 's|/Users/rheiyat/Library/Application Support/Code/User/globalStorage/github.copilot-chat/copilotCli:||')
