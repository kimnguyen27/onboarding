package com.vivvo.onboarding.util;

import lombok.Builder;

import java.util.List;
import java.util.function.BiConsumer;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.stream.Collectors;

@Builder
public class CollectionComparator<L, R, K> {

    private final List<L> left;
    private final List<R> right;
    private final Function<L, K> leftKeySelector;
    private final Function<R, K> rightKeySelector;
    private final Consumer<R> whenAdded;
    private final Consumer<L> whenRemoved;
    private final BiConsumer<L, R> whenUpdated;


    public void compare() {
        List<K> leftKeys = left.stream().map(leftKeySelector).collect(Collectors.toList());
        List<K> rightKeys = right.stream().map(rightKeySelector).collect(Collectors.toList());

        leftKeys.forEach(lk -> {
            if(rightKeys.contains(lk)) {
                whenUpdated.accept(getLeftById(lk), getRightById(lk));
            } else if (!rightKeys.contains(lk)) {
                whenRemoved.accept(getLeftById(lk));
            }
        });

        rightKeys.forEach(rk -> {
            if(!leftKeys.contains(rk)) {
                whenAdded.accept(getRightById(rk));
            }
        });
    }

    private R getRightById(K id) {
        return right.stream()
                .filter(r -> rightKeySelector.apply(r).equals(id))
                .findFirst()
                .orElse(null);
    }

    private L getLeftById(K id) {
        return left.stream()
                .filter(l -> leftKeySelector.apply(l).equals(id))
                .findFirst()
                .orElse(null);
    }



}
