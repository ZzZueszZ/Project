package dev.xbase.core.configurations.controller.filter;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.CommonsRequestLoggingFilter;

@Configuration
@RequiredArgsConstructor
public class RequestLoggingFilterConfig {
  @NonNull
  final TraceFilter traceFilter;

  @Bean
  public CommonsRequestLoggingFilter logFilter() {
    CommonsRequestLoggingFilter filter
        = new CommonsRequestLoggingFilter();
    filter.setIncludeQueryString(true);
    filter.setIncludePayload(true);
    filter.setMaxPayloadLength(10000);
    filter.setIncludeHeaders(false);
    filter.setAfterMessagePrefix("REQUEST DATA : ");
    return filter;
  }

  @Bean
  public FilterRegistrationBean<CustomURLFilter> filterRegistrationBean() {
    FilterRegistrationBean<CustomURLFilter> registrationBean = new FilterRegistrationBean<>();
    CustomURLFilter customURLFilter = new CustomURLFilter();

    registrationBean.setFilter(customURLFilter);
    registrationBean.setOrder(2); //set precedence
    return registrationBean;
  }

  @Bean
  public FilterRegistrationBean<TraceFilter> traceFilterRegistrationBean() {
    FilterRegistrationBean<TraceFilter> registrationBean = new FilterRegistrationBean<>();
    registrationBean.setFilter(traceFilter);
    registrationBean.setOrder(2);
    return registrationBean;
  }
}
