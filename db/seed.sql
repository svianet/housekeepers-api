-- create roles (needs update the sequence - domain data)
INSERT INTO public.role(role_id, role_name)	VALUES (1, 'Administrator');
INSERT INTO public.role(role_id, role_name)	VALUES (2, 'Housekeeper');
INSERT INTO public.role(role_id, role_name)	VALUES (3, 'Customer');

-- initial languages
INSERT INTO public.language(lang_id, language_name, language_code)
	VALUES (nextval('language_lang_id_seq'::regclass), 'English (United States)', 'en-us');
INSERT INTO public.language(lang_id, language_name, language_code)
	VALUES (nextval('language_lang_id_seq'::regclass), 'Portuguese (Brazil)', 'pt-br');
INSERT INTO public.language(lang_id, language_name, language_code)
	VALUES (nextval('language_lang_id_seq'::regclass), 'Spanish', 'es');

-- services
INSERT INTO public.service(service_id, service_name)
	VALUES (nextval('service_service_id_seq'::regclass), 'Deep cleaning');
INSERT INTO public.service(service_id, service_name)
	VALUES (nextval('service_service_id_seq'::regclass), 'Bathroom cleaning');
INSERT INTO public.service(service_id, service_name)
	VALUES (nextval('service_service_id_seq'::regclass), 'Kitchen cleaning');
INSERT INTO public.service(service_id, service_name)
	VALUES (nextval('service_service_id_seq'::regclass), 'General room cleaning');
INSERT INTO public.service(service_id, service_name)
	VALUES (nextval('service_service_id_seq'::regclass), 'Window washing');
INSERT INTO public.service(service_id, service_name)
	VALUES (nextval('service_service_id_seq'::regclass), 'Carpet shampooing');
INSERT INTO public.service(service_id, service_name)
	VALUES (nextval('service_service_id_seq'::regclass), 'Furniture treatment');
INSERT INTO public.service(service_id, service_name)
	VALUES (nextval('service_service_id_seq'::regclass), 'Laundry');
INSERT INTO public.service(service_id, service_name)
	VALUES (nextval('service_service_id_seq'::regclass), 'Vacuuming and/or mopping');
INSERT INTO public.service(service_id, service_name)
	VALUES (nextval('service_service_id_seq'::regclass), 'Cabinet Cleaning');
INSERT INTO public.service(service_id, service_name)
	VALUES (nextval('service_service_id_seq'::regclass), 'Move-out cleaning');

-- ADMIN
INSERT INTO public.person(pers_id, first_name, last_name, birthday, gender, bio)
	VALUES (nextval('person_pers_id_seq'::regclass), 'Admin', 'Housekeeper', null, 'M', null);
INSERT INTO public.account(user_id, email, failed_access, pers_id)
	VALUES (nextval('account_user_id_seq'::regclass), 'adminhousekeeper@mailinator.com', 0, currval('person_pers_id_seq'::regclass));	
INSERT INTO public.user_role(user_id, role_id) VALUES (currval('account_user_id_seq'::regclass), 1);

-- housekeeper
INSERT INTO public.person(pers_id, first_name, last_name, birthday, gender, bio)
	VALUES (nextval('person_pers_id_seq'::regclass), 'Leticia', 'Silva', null, 'F', 'Are you looking for a professional to clean or your home or office? It will be a pleasure to help you. I am punctual, honest, meticulous and very capricious. I''ve been a professional for six years. My cleanliness is of high quality with total satisfaction from my customers. I hope to have you as another satisfied customer soon!');
INSERT INTO public.account(user_id, email, failed_access, pers_id)
	VALUES (nextval('account_user_id_seq'::regclass), 'leticiasilva@mailinator.com', 0, currval('person_pers_id_seq'::regclass));	
INSERT INTO public.user_role(user_id, role_id) 
	VALUES (currval('account_user_id_seq'::regclass), 2);
INSERT INTO public.account_config(config_id, user_id, hour_rate_start, hour_rate_end, years_experience)
	VALUES (nextval('account_config_config_id_seq'::regclass), 2, 11, 22, 4);

-- customer
INSERT INTO public.person(pers_id, first_name, last_name, birthday, gender, bio)
	VALUES (nextval('person_pers_id_seq'::regclass), 'John', 'Smith', null, 'M', null);
INSERT INTO public.account(user_id, email, failed_access, pers_id)
	VALUES (nextval('account_user_id_seq'::regclass), 'johnsmith@mailinator.com', 0, currval('person_pers_id_seq'::regclass));	
