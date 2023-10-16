package dev.xbase.core.starter.autoconfigure.email;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.Objects;

@ConfigurationProperties(prefix = "app.module.email.config")
@Data
class EmailModuleProperties {
    String mailFrom = "";
    String mailFromName = "";
    String smtpHost = "smtp.gmail.com";
    Integer smtpPort = 587;
    String smtpUsername = "";
    String smtpPassword = "";
    String smtpAuth = "true";
    String smtpStarttls = "true";
    String smtpSsl = "No";
    String smtpProtocols = "TLSv1.2";
    Boolean debug = true;
    public boolean isDebug() {
        return Objects.nonNull(debug) && debug;
    }
}
