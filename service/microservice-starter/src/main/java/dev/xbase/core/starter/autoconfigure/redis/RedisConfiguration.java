//package tech.outsource.core.starter.autoconfigure.redis;
//
//import org.springframework.boot.autoconfigure.cache.RedisCacheManagerBuilderCustomizer;
//import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
//import org.springframework.boot.autoconfigure.data.redis.RedisProperties;
//import org.springframework.cache.annotation.EnableCaching;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.Primary;
//import org.springframework.data.redis.cache.RedisCacheConfiguration;
//import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
//import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
//import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
//import org.springframework.data.redis.serializer.RedisSerializationContext;
//
//import java.time.Duration;
//
//@Configuration
//@EnableCaching
//@ConditionalOnProperty(value = "app.module.redis.enabled", havingValue = "true")
//@EnableRedisRepositories(basePackages = {"tech.outsource.core.repository.redis", "tech.outsource.repository.redis"})
//public class RedisConfiguration {
//
//    @Bean
//    public LettuceConnectionFactory redisConnectionFactory() {
//        RedisProperties properties = redisProperties();
//        RedisStandaloneConfiguration configuration = new RedisStandaloneConfiguration();
//
//        configuration.setHostName(properties.getHost());
//        configuration.setPort(properties.getPort());
//
//        return new LettuceConnectionFactory(configuration);
//    }
//
//    @Bean
//    public RedisTemplate<byte[], byte[]> redisTemplate() {
//        RedisTemplate<byte[], byte[]> template = new RedisTemplate<>();
//
//        template.setConnectionFactory(redisConnectionFactory());
//
//        return template;
//    }
//
//    @Bean
//    @Primary
//    public RedisProperties redisProperties() {
//        return new RedisProperties();
//    }
//
//    @Bean
//    public RedisCacheManagerBuilderCustomizer redisCacheManagerBuilderCustomizer() {
//        RedisSerializationContext.SerializationPair<Object> jsonSerializer =
//                RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer());
//
//        return (builder) -> builder
//                .cacheDefaults(
//                        RedisCacheConfiguration.defaultCacheConfig()
//                                .entryTtl(Duration.ofMinutes(30))
//                )
//                .withCacheConfiguration("serialCacheFiveMinutes",
//                        RedisCacheConfiguration.defaultCacheConfig()
//                                .entryTtl(Duration.ofMinutes(5)))
//                .withCacheConfiguration("serialCacheTenMinutes",
//                        RedisCacheConfiguration.defaultCacheConfig()
//                                .entryTtl(Duration.ofMinutes(10)))
//                .withCacheConfiguration("jsonCacheTenMinutes",
//                        RedisCacheConfiguration.defaultCacheConfig()
//                                .serializeValuesWith(jsonSerializer)
//                                .entryTtl(Duration.ofMinutes(10)))
//                .withCacheConfiguration("jsonCacheFiveMinutes",
//                        RedisCacheConfiguration.defaultCacheConfig()
//                                .serializeValuesWith(jsonSerializer)
//                                .entryTtl(Duration.ofMinutes(5)));
//    }
//}
