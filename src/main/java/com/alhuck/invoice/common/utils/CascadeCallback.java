package com.alhuck.invoice.common.utils;

import java.lang.reflect.Field;
import java.util.Collection;

import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.util.ReflectionUtils;

import com.alhuck.invoice.common.CascadeSave;
import com.alhuck.invoice.common.CascadeSaveCollection;

public class CascadeCallback implements ReflectionUtils.FieldCallback {

    private Object source;
    private MongoOperations mongoOperations;

    CascadeCallback(final Object source, final MongoOperations mongoOperations) {
        this.source = source;
        this.mongoOperations = mongoOperations;
    }

    @Override
    public void doWith(Field field) throws IllegalArgumentException, IllegalAccessException {

        ReflectionUtils.makeAccessible(field);

        if (field.isAnnotationPresent(DBRef.class) && field.isAnnotationPresent(CascadeSave.class)) {

            final Object fieldValue = field.get(getSource());

            if (fieldValue != null) {

                final FieldCallback callback = new FieldCallback();
                ReflectionUtils.doWithFields(fieldValue.getClass(), callback);
//                if(fieldValue.getClass())
                getMongoOperations().save(fieldValue);
            }
        }
        
        if (field.isAnnotationPresent(DBRef.class) && field.isAnnotationPresent(CascadeSaveCollection.class)) {

            final Collection<? extends Object> fieldValue = (Collection<? extends Object>) field.get(getSource());

            if (fieldValue != null) {

                final FieldCallback callback = new FieldCallback();
                ReflectionUtils.doWithFields(fieldValue.getClass(), callback);
                for(Object insObj : fieldValue) {
                    getMongoOperations().save(insObj);
                }
//                getMongoOperations().insertAll(fieldValue);
            }
        }

    }

    private Object getSource() {
        return this.source;
    }

    private void setSource(Object source) {
        this.source = source;
    }

    private MongoOperations getMongoOperations() {
        return this.mongoOperations;
    }

    private void setMongoOperations(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

}
