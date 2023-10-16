package dev.xbase.core.configurations.controller.exceptions;

import org.springframework.http.HttpStatus;
import dev.xbase.core.constants.CoreErrorCodes;

public class ConflictsException extends ApplicationException {
    public ConflictsException() {
        super(CoreErrorCodes.CONFLICT, CoreErrorCodes.CONFLICT.getMessage(), HttpStatus.CONFLICT);
    }
}
