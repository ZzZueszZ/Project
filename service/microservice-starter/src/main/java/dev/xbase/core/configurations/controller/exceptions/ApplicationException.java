package dev.xbase.core.configurations.controller.exceptions;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import dev.xbase.core.constants.ErrorCodes;

@Getter
@RequiredArgsConstructor
public class ApplicationException extends RuntimeException {
    final ErrorCodes errorCode;
    final String message;
    final HttpStatus httpStatus;
}
