//package tech.outsource.core.starter.autoconfigure.redis;
//
//import org.jetbrains.annotations.NotNull;
//import org.springframework.cache.interceptor.KeyGenerator;
//import org.springframework.stereotype.Component;
//import org.springframework.util.StringUtils;
//
//import java.lang.reflect.Method;
//
//@Component("customKeyGenerator")
//public class CustomKeyGenerator implements KeyGenerator {
//    @NotNull
//    @Override
//    public Object generate(Object o, Method method, @NotNull Object... params) {
//        return String.format("%s_%s_%s",
//                o.getClass().getSimpleName(),
//                method.getName(),
//                StringUtils.arrayToDelimitedString(params, "_"));
//    }
//}
