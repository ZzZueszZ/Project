package dev.xbase;

import dev.xbase.core.configurations.SpringContext;
import dev.xbase.core.starter.autoconfigure.email.EmailService;
import dev.xbase.core.starter.autoconfigure.email.domain.Address;
import dev.xbase.core.starter.autoconfigure.email.domain.Addresses;
import dev.xbase.core.starter.autoconfigure.email.domain.EmailAttachments;
import dev.xbase.core.starter.autoconfigure.email.domain.EmailBody;
import dev.xbase.core.starter.autoconfigure.email.domain.EmailBodyType;
import dev.xbase.core.starter.autoconfigure.email.domain.EmailSubject;
import dev.xbase.core.starter.autoconfigure.email.domain.MetaData;
import dev.xbase.core.starter.autoconfigure.email.domain.PrepareEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import java.util.List;

@SpringBootApplication
public class Application implements CommandLineRunner {
    @Autowired
    EmailService emailService;
    @Autowired
    ApplicationContext applicationContext;
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Override
    public void run(String... args) {
        PrepareEmail prepareEmail = PrepareEmail.builder()
                .from(new Address("vunt", "nguyenthachvu.vn@gmail.com"))
                .tos(new Addresses(List.of(new Address("nguyenthachvu.vn@gmail.com", "nguyenthachvu.vn@gmail.com"))))
                .subject(new EmailSubject(applicationContext.getId()))
                .type(EmailBodyType.Text)
                .body(new EmailBody("test"))
                .ccs(Addresses.ofEmpty())
                .bccs(Addresses.ofEmpty())
                .attachments(EmailAttachments.ofEmpty())
                .metaData(MetaData.ofEmpty())
                .build();

        emailService.send(prepareEmail);
    }
}
