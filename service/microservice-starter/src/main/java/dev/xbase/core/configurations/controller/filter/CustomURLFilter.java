package dev.xbase.core.configurations.controller.filter;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.Enumeration;
import java.util.Objects;
import java.util.UUID;

@Slf4j
public class CustomURLFilter implements Filter {

  private static final String REQUEST_ID = "request_id";

  @Override
  public void init(FilterConfig filterConfig) {}

  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
      throws IOException, ServletException {

    if(Objects.isNull(servletRequest.getAttribute(REQUEST_ID))){
      String requestId = UUID.randomUUID().toString();
      servletRequest.setAttribute(REQUEST_ID, requestId);
      logRequest((HttpServletRequest) servletRequest, requestId);
    }
    filterChain.doFilter(servletRequest, servletResponse);
  }

  private void logRequest(HttpServletRequest request, String requestId) {
    if (request != null) {
      StringBuilder data = new StringBuilder();
      data.append("\nLOGGING REQUEST-----------------------------------\n")
          .append("[REQUEST-ID]: ").append(requestId).append("\n")
          .append("[PATH]: ").append(request.getRequestURI()).append("\n")
          .append("[QUERIES]: ").append(request.getQueryString()).append("\n")
          .append("[HEADERS]: ").append("\n");

      Enumeration<String> headerNames = request.getHeaderNames();
      while (headerNames.hasMoreElements()) {
        String key = headerNames.nextElement();
        String value = request.getHeader(key);
        data.append("---").append(key).append(" : ").append(value).append("\n");
      }
      data.append("LOGGING REQUEST-----------------------------------\n");

      log.info(data.toString());
    }
  }
}
