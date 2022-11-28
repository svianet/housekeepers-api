-- This script was generated by a beta version of the ERD tool in pgAdmin 4.
-- Please log an issue at https://redmine.postgresql.org/projects/pgadmin4/issues/new if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public.account
(
    user_id serial NOT NULL,
    email character varying(100) NOT NULL,
    failed_access numeric NOT NULL DEFAULT 0,
    pers_id integer,
    PRIMARY KEY (user_id)
);

ALTER TABLE IF EXISTS public.account
    ADD COLUMN account_status character varying(1) DEFAULT 'P';

COMMENT ON COLUMN public.account.account_status
    IS 'P - Pending
V - Validated
B - Blocked
X - Removed';

COMMENT ON COLUMN public.account.failed_access
    IS 'Quantity of access to the system with the wrong password';

CREATE UNIQUE INDEX un_user_email
    ON public.account USING btree
    (email ASC NULLS LAST)
;

CREATE TABLE IF NOT EXISTS public.person
(
    pers_id serial NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    birthday timestamp without time zone,
    gender character varying(1),
    bio text,
    PRIMARY KEY (pers_id)
);

COMMENT ON COLUMN public.person.gender
    IS 'F - Female
M - Male';

CREATE TABLE IF NOT EXISTS public.role
(
    role_id serial NOT NULL,
    role_name character varying NOT NULL,
    PRIMARY KEY (role_id)
);

COMMENT ON COLUMN public.role.role_name
    IS 'Can be: administrator, housekeeper, customer, etc.';

CREATE TABLE IF NOT EXISTS public.user_role
(
    user_id integer NOT NULL,
    role_id integer NOT NULL,
    PRIMARY KEY (role_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.phone
(
    phone_id serial NOT NULL,
    phone_number character varying(20) NOT NULL,
    creation_date timestamp with time zone NOT NULL DEFAULT current_timestamp,
    pers_id integer NOT NULL,
    PRIMARY KEY (phone_id)
);

CREATE TABLE IF NOT EXISTS public.address
(
    adress_id serial NOT NULL,
    street_line1 character varying(100),
    street_line2 character varying,
    neighborhood character varying,
    city character varying NOT NULL,
    state character varying(2) NOT NULL,
    zipcode character varying NOT NULL,
    pers_id integer,
    PRIMARY KEY (adress_id)
);

CREATE TABLE IF NOT EXISTS public.language
(
    lang_id serial NOT NULL,
    language_name character varying(100) NOT NULL,
    language_code character varying(10) NOT NULL,
    PRIMARY KEY (lang_id)
);

COMMENT ON COLUMN public.language.language_code
    IS 'Language code and country code in ISO format';

CREATE UNIQUE INDEX un_language_code
    ON public.language USING btree
    (language_code ASC NULLS LAST)
;

CREATE TABLE IF NOT EXISTS public.person_language
(
    lang_id integer NOT NULL,
    pers_id integer NOT NULL,
    PRIMARY KEY (lang_id, pers_id)
);

CREATE TABLE IF NOT EXISTS public.job
(
    job_id serial NOT NULL,
    job_type character varying(1) NOT NULL,
    start_date timestamp without time zone,
    frequency character varying NOT NULL,
    days character varying(7),
    zipcode character varying NOT NULL,
    bedrooms integer NOT NULL DEFAULT 1,
    bathrooms integer NOT NULL DEFAULT 1,
    have_pets integer NOT NULL,
    sq_footage integer NOT NULL,
    provide_supplies integer NOT NULL,
    provide_equipment integer NOT NULL,
    hour_rate_start integer NOT NULL,
    hour_rate_end integer NOT NULL,
    end_date timestamp without time zone,
    user_id integer NOT NULL,
    job_description text,
    job_status character varying,
    PRIMARY KEY (job_id)
);

COMMENT ON COLUMN public.job.job_type
    IS 'R - Recurring, O - One time job';

COMMENT ON COLUMN public.job.frequency
    IS 'W - Week
Q - Every other week
M - Every month
1 - One time';

COMMENT ON COLUMN public.job.days
    IS 'Days of job (can combine the initials of each day)
S - Sunday
M - Monday
T - Tuesday
W - Wednesday
H - Thrusday
F - Friday
A - Saturday';

COMMENT ON COLUMN public.job.job_status
    IS 'O - Opened, C - Cancelled, E - Expired, A - Accepted, D - Done ';

CREATE TABLE IF NOT EXISTS public.service
(
    service_id serial NOT NULL,
    service_name character varying(200) NOT NULL,
    PRIMARY KEY (service_id)
);

CREATE TABLE IF NOT EXISTS public.job_service
(
    job_id integer NOT NULL,
    service_id integer NOT NULL,
    PRIMARY KEY (service_id, job_id)
);

CREATE TABLE IF NOT EXISTS public.schedule
(
    schedule_id serial NOT NULL,
    user_id integer NOT NULL,
    creation_date timestamp without time zone NOT NULL DEFAULT current_timestamp,
    PRIMARY KEY (schedule_id)
);

CREATE TABLE IF NOT EXISTS public.schedule_day
(
    schedule_day_id serial NOT NULL,
    schedule_id integer NOT NULL,
    schedule_day character varying(1) NOT NULL,
    time_start character varying(5) NOT NULL,
    time_end character varying(5) NOT NULL,
    PRIMARY KEY (schedule_day_id)
);

COMMENT ON COLUMN public.schedule_day.schedule_day
    IS 'Sunday, Monday, etc.';

CREATE TABLE IF NOT EXISTS public.applicant_list
(
    user_id integer NOT NULL,
    job_id integer NOT NULL,
    application_status character varying NOT NULL,
    application_date timestamp without time zone NOT NULL DEFAULT current_timestamp
);

COMMENT ON COLUMN public.applicant_list.application_status
    IS 'Status: R - Requested, V - Viewed, A - Accepted, X - Reject';

CREATE TABLE IF NOT EXISTS public.service_completion
(
    service_comp_id serial NOT NULL,
    service_comp_status character varying(1) NOT NULL DEFAULT 'O',
    job_id integer NOT NULL,
    user_id integer NOT NULL,
    review text,
    start_date timestamp without time zone,
    end_date timestamp without time zone,
    confirmation_code character varying(10) NOT NULL,
    appointment_id integer,
    confirmation_date timestamp without time zone,
    PRIMARY KEY (service_comp_id)
);

COMMENT ON COLUMN public.service_completion.service_comp_status
    IS 'Service execution status. O - Opened, S - Started, E - Executed, C - Cancelled';

COMMENT ON COLUMN public.service_completion.confirmation_code
    IS 'Code used to validate the service execution and confirm that the housekeeper is the right person';

CREATE TABLE IF NOT EXISTS public.appointment
(
    appointment_id serial NOT NULL,
    appointment_start_date timestamp without time zone NOT NULL,
    appointment_end timestamp without time zone NOT NULL,
    time_planned numeric NOT NULL,
    summary text,
    description text,
    user_id integer NOT NULL,
    user_id_provider integer,
    job_id integer,
    PRIMARY KEY (appointment_id)
);

COMMENT ON COLUMN public.appointment.time_planned
    IS 'How much is planned the appoint';

COMMENT ON COLUMN public.appointment.user_id_provider
    IS 'Who will execute the service';

CREATE TABLE IF NOT EXISTS public.email_address
(
    email_id serial NOT NULL,
    email_address character varying(200) NOT NULL,
    pers_id integer NOT NULL,
    PRIMARY KEY (email_id)
);

CREATE TABLE IF NOT EXISTS public.contact
(
    contact_id serial NOT NULL,
    user_id integer NOT NULL,
    pers_id integer NOT NULL,
    creation_date timestamp without time zone NOT NULL DEFAULT current_timestamp,
    PRIMARY KEY (contact_id)
);

CREATE TABLE IF NOT EXISTS public.account_service
(
    user_id integer NOT NULL,
    service_id integer NOT NULL,
    PRIMARY KEY (user_id, service_id)
);

ALTER TABLE IF EXISTS public.account_config
    ADD FOREIGN KEY (user_id)
    REFERENCES public.account (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE IF EXISTS public.account_service
    ADD FOREIGN KEY (service_id)
    REFERENCES public.service (service_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.account_service
    ADD FOREIGN KEY (user_id)
    REFERENCES public.account (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE IF EXISTS public.account
    ADD FOREIGN KEY (pers_id)
    REFERENCES public.person (pers_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.user_role
    ADD FOREIGN KEY (user_id)
    REFERENCES public.account (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.user_role
    ADD FOREIGN KEY (role_id)
    REFERENCES public.role (role_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.phone
    ADD FOREIGN KEY (pers_id)
    REFERENCES public.person (pers_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.address
    ADD FOREIGN KEY (pers_id)
    REFERENCES public.person (pers_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.person_language
    ADD FOREIGN KEY (lang_id)
    REFERENCES public.language (lang_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.person_language
    ADD FOREIGN KEY (pers_id)
    REFERENCES public.person (pers_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.job
    ADD FOREIGN KEY (user_id)
    REFERENCES public.account (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.job_service
    ADD FOREIGN KEY (job_id)
    REFERENCES public.job (job_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.job_service
    ADD FOREIGN KEY (service_id)
    REFERENCES public.service (service_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.schedule
    ADD FOREIGN KEY (user_id)
    REFERENCES public.account (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.schedule_day
    ADD FOREIGN KEY (schedule_id)
    REFERENCES public.schedule (schedule_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.applicant_list
    ADD FOREIGN KEY (user_id)
    REFERENCES public.account (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.applicant_list
    ADD FOREIGN KEY (job_id)
    REFERENCES public.job (job_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.service_completion
    ADD FOREIGN KEY (job_id)
    REFERENCES public.job (job_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.service_completion
    ADD FOREIGN KEY (user_id)
    REFERENCES public.account (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.service_completion
    ADD FOREIGN KEY (appointment_id)
    REFERENCES public.appointment (appointment_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.appointment
    ADD FOREIGN KEY (job_id)
    REFERENCES public.job (job_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.appointment
    ADD FOREIGN KEY (user_id)
    REFERENCES public.account (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.appointment
    ADD FOREIGN KEY (user_id_provider)
    REFERENCES public.account (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.email_address
    ADD FOREIGN KEY (pers_id)
    REFERENCES public.person (pers_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.contact
    ADD FOREIGN KEY (user_id)
    REFERENCES public.account (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.contact
    ADD FOREIGN KEY (pers_id)
    REFERENCES public.person (pers_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;